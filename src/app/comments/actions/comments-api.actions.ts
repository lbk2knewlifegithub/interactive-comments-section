import { Comment } from '@lbk/comments/models';
import { createAction, props } from '@ngrx/store';

export const loadCommentsSuccess = createAction(
  '[Comments/API] Load Comment Success',
  props<{ comments: Comment[] }>()
);

export const loadCommentFailure = createAction(
  '[Comments/API] Load Comment Failure',
  props<{ error: any }>()
);

export const deleteCommentSuccess = createAction(
  '[Comments/API] Delete Comment Success',
  props<{ id: number }>()
);

export const deleteCommentFailure = createAction(
  '[Comments/API] Delete Comment Failure',
  props<{ error: any }>()
);


export const addCommentSuccess = createAction(
  '[Comments/API] Add Comment Success',
  props<{ comment: Comment }>()
);

export const addCommentFailure = createAction(
  '[Comments/API] Add Comment Failure',
  props<{ error: any }>()
);
