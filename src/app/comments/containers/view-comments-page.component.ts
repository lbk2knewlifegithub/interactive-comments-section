import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoginPageActions } from '@lbk/auth/actions';
import * as fromAuth from '@lbk/auth/reducers';
import { Comment } from '@lbk/comments/models';
import * as fromComments from '@lbk/comments/reducers';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { CommentsPageActions } from '../actions';

@Component({
  selector: 'lbk-view-comments-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="mt-8">
      <div class="container">
        <!-- comment list -->
        <lbk-comment-list
          [username]="(username$ | async)!"
          [comments]="(comments$ | async)!"
        ></lbk-comment-list>
        <!-- end comment list -->

        <!-- enter comment -->
        <!-- end enter comment -->
      </div>
    </main>
  `,
})
export class ViewCommentsPageComponent implements OnInit {
  comments$!: Observable<Comment[]>;
  username$!: Observable<string | undefined>;

  constructor(private readonly _store: Store) {
    this.comments$ = _store.select(fromComments.selectAllComments);
    this.username$ = _store
      .select(fromAuth.selectUser)
      .pipe(map((user) => user?.username));
  }

  ngOnInit(): void {
    this._store.dispatch(
      LoginPageActions.login({ credentials: { username: 'fake' } })
    );
    this._store.dispatch(CommentsPageActions.enter());
  }
}
