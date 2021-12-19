import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoginPageActions } from '@lbk/auth/actions';
import { Store } from '@ngrx/store';
import { CommentsPageActions } from '../actions';

@Component({
  selector: 'lbk-view-comments-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <h1>banana</h1>
  `,
})
export class ViewCommentsPageComponent  implements  OnInit{

  constructor(private readonly _store: Store){
  }

  ngOnInit(): void {
    this._store.dispatch(LoginPageActions.login({credentials: {username: "fake"}}))
    this._store.dispatch(CommentsPageActions.enter())
  }
}
