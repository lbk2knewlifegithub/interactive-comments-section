import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoginPageActions } from '@lbk/auth/actions';
import { Comment } from '@lbk/comments/models';
import * as fromComments from '@lbk/comments/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommentsPageActions } from '../actions';

@Component({
  selector: 'lbk-view-comments-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="mt-8">
      <div class="container">
        <!-- comment list -->
        <lbk-comment-list [comments]="(comments$ | async)!"></lbk-comment-list>
        <!-- end comment list -->
      </div>
    </main>
  `,
})
export class ViewCommentsPageComponent implements OnInit {
  comments$!: Observable<Comment[]>;

  constructor(private readonly _store: Store) {
    this.comments$ = _store.select(fromComments.selectAllComments);
  }

  ngOnInit(): void {
    this._store.dispatch(
      LoginPageActions.login({ credentials: { username: 'fake' } })
    );
    this._store.dispatch(CommentsPageActions.enter());
  }
}
