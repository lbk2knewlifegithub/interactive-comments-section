import { Inject, Injectable } from '@angular/core';
import { CommentsApiActions, CommentsPageActions } from '@lbk/comments/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CommentsServiceFake } from '../services/comments-fake.service';
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

  addComment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CommentsPageActions.addComment),
      switchMap(({ user, content }) =>
        this._commentsService.addComment(user, content).pipe(
          map((comment) => CommentsApiActions.addCommentSuccess({ comment })),
          catchError((error) =>
            of(CommentsApiActions.addCommentFailure({ error }))
          )
        )
      )
    )
  );

  addReply$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CommentsPageActions.addReply),
      switchMap(({ replyDto }) =>
        this._commentsService.addReply(replyDto).pipe(
          map(({ commentId, comment }) =>
            CommentsApiActions.addReplySuccess({ comment, commentId })
          ),
          catchError((error) =>
            of(CommentsApiActions.addReplyFailure({ error }))
          )
        )
      )
    )
  );

  editComment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CommentsPageActions.editComment),
      switchMap(({ edit }) =>
        this._commentsService.editComment(edit).pipe(
          map((_) => CommentsApiActions.editCommentSuccess({ edit })),
          catchError((error) =>
            of(CommentsApiActions.editCommentFailure({ error }))
          )
        )
      )
    )
  );

  upScore$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CommentsPageActions.upScore),
      switchMap(({ commentId }) =>
        this._commentsService.upScore(commentId).pipe(
          map((_) => CommentsApiActions.upScoreSuccess({ commentId })),
          catchError((error) =>
            of(CommentsApiActions.upScoreFailure({ error }))
          )
        )
      )
    )
  );

  downScore$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CommentsPageActions.downScore),
      switchMap(({ commentId }) =>
        this._commentsService.downScore(commentId).pipe(
          map((_) => CommentsApiActions.downScoreSuccess({ commentId })),
          catchError((error) =>
            of(CommentsApiActions.downScoreFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions,
    @Inject(CommentsServiceFake)
    private readonly _commentsService: CommentsService
  ) {}
}
