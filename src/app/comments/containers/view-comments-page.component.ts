import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoginPageActions } from '@lbk/auth/actions';
import { User } from '@lbk/auth/models';
import * as fromAuth from '@lbk/auth/reducers';
import { Comment } from '@lbk/comments/models';
import * as fromComments from '@lbk/comments/reducers';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { CommentsPageActions } from '../actions';

@Component({
  selector: 'lbk-view-comments-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="">
      <div class="container">
        <!-- comment list -->
        <lbk-comment-list
          (delete)="requestDeleteComment($event)"
          [username]="(username$ | async)!"
          [comments]="(comments$ | async)!"
        ></lbk-comment-list>
        <!-- end comment list -->

        <!-- enter comment -->
        <lbk-enter-comment
          (enter)="addComment($event)"
          class="block mt-10 mb-40"
          [user]="(user$ | async)!"
        ></lbk-enter-comment>
        <!-- end enter comment -->
      </div>

      <!-- delete popup -->
      <lbk-delete-popup
        (deleted)="onConfirmDelete($event)"
        [open]="(openDeletePopup$ | async)!"
      ></lbk-delete-popup>
      <!-- end delete popup -->
    </main>
  `,
})
export class ViewCommentsPageComponent implements OnInit {
  comments$!: Observable<Comment[]>;
  user$!: Observable<User | null>;
  username$!: Observable<string | undefined>;
  openDeletePopup$!: Observable<boolean>;
  deleteId$!: Observable<number | undefined>;

  constructor(private readonly _store: Store) {
    this.comments$ = _store.select(fromComments.selectAllComments);
    this.user$ = _store.select(fromAuth.selectUser);
    this.username$ = this.user$.pipe(map((user) => user?.username));
    this.deleteId$ = _store.select(fromComments.selectDeleteId);
    this.openDeletePopup$ = this.deleteId$.pipe(map((id) => !!id));

    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 200);
  }

  ngOnInit(): void {
    this._store.dispatch(
      LoginPageActions.login({ credentials: { username: 'fake' } })
    );
    this._store.dispatch(CommentsPageActions.enter());
  }

  requestDeleteComment(id: number) {
    this._store.dispatch(CommentsPageActions.setDeleteId({ id }));
  }

  onConfirmDelete(deleted: boolean) {
    if (deleted) {
      this.deleteId$.pipe(take(1)).subscribe((id) => {
        console.log(id);
        this._store.dispatch(CommentsPageActions.deleteComment({ id: id! }));
      });
    }

    this._store.dispatch(CommentsPageActions.setDeleteId({ id: undefined }));
  }

  addComment(content: string) {
    this.user$.pipe(take(1)).subscribe((user) => {
      if (!user) return;
      this._store.dispatch(CommentsPageActions.addComment({ user, content }));
    });
  }
}
