import { Injectable } from '@angular/core';
import { CommentsApiActions, CommentsPageActions } from '@lbk/comments/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CommentsService } from '../services/comments.service';

@Injectable()
export class CommentEffects {
  loadComments$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CommentsPageActions.enter),
      switchMap(() =>
        this._commentsService.getComments().pipe(
          map((comments) =>
            CommentsApiActions.loadCommentsSuccess({ comments })
          ),
          catchError((error) =>
            of(CommentsApiActions.loadCommentFailure({ error }))
          )
        )
      )
    )
  );

  deleteComment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CommentsPageActions.deleteComment),
      switchMap(({ id }) =>
        this._commentsService.deleteComment(id).pipe(
          map(() => CommentsApiActions.deleteCommentSuccess({ id })),
          catchError((error) =>
            of(CommentsApiActions.loadCommentFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _commentsService: CommentsService
  ) {}
}
