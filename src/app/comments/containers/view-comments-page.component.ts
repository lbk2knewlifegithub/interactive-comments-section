import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoginPageActions } from '@lbk/auth/actions';
import { User } from '@lbk/auth/models';
import * as fromAuth from '@lbk/auth/reducers';
import { Comment, Edit, ReplyDto } from '@lbk/comments/models';
import * as fromComments from '@lbk/comments/reducers';
import { slideIn } from '@lbk/shared/animations';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { CommentsPageActions } from '../actions';

@Component({
  selector: 'lbk-view-comments-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="mt-6 md:mt-10" *ngIf="user$ | async as user">
      <div class="container max-w-4xl">
        <!-- comment list -->
        <lbk-comment-list
          (reply)="addReply($event)"
          (delete)="requestDeleteComment($event)"
          (up)="upScore($event)"
          (down)="downScore($event)"
          (edit)="editComment($event)"
          [myUser]="user"
          [comments]="(comments$ | async)!"
        ></lbk-comment-list>
        <!-- end comment list -->

        <!-- enter comment -->
        <lbk-enter-comment
          @slideIn
          (enter)="addComment($event)"
          class="block mt-10 mb-40"
          [user]="user"
        ></lbk-enter-comment>
        <!-- end enter comment -->
      </div>

      <!-- delete dialog -->
      <lbk-delete-dialog
        class="fixed"
        [open]="(openDeletePopup$ | async)!"
        (deleted)="onConfirmDelete($event)"
      ></lbk-delete-dialog>
      <!-- end delete dialog -->
    </main>
  `,
  animations: [slideIn({ delayEnter: 1000 })],
})
export class ViewCommentsPageComponent implements OnInit {
  comments$!: Observable<Comment[]>;
  user$!: Observable<User | null>;
  openDeletePopup$!: Observable<boolean>;
  deleteId$!: Observable<number | undefined>;

  constructor(private readonly _store: Store) {
    this.comments$ = _store.select(fromComments.selectAllComments);
    this.user$ = _store.select(fromAuth.selectUser);
    this.deleteId$ = _store.select(fromComments.selectDeleteId);
    this.openDeletePopup$ = this.deleteId$.pipe(map((id) => !!id));
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

  addReply(replyDto: ReplyDto) {
    this._store.dispatch(CommentsPageActions.addReply({ replyDto }));
  }

  upScore(commentId: number) {
    this._store.dispatch(CommentsPageActions.upScore({ commentId }));
  }

  downScore(commentId: number) {
    this._store.dispatch(CommentsPageActions.downScore({ commentId }));
  }

  editComment(edit: Edit) {
    this._store.dispatch(CommentsPageActions.editComment({ edit }));
  }
}
