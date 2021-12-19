import { Comment } from '@lbk/comments/models';
import { createAction, props } from '@ngrx/store';

/**
 * - Load comments
 */
export const loadCommentsSuccess = createAction(
  '[Comments/API] Load Comment Success',
  props<{ comments: Comment[] }>()
);

export const loadCommentFailure = createAction(
  '[Comments/API] Load Comment Failure',
  props<{ error: any }>()
);

/**
 * - Delete comments
 */
export const deleteCommentSuccess = createAction(
  '[Comments/API] Delete Comment Success',
  props<{ id: number }>()
);

export const deleteCommentFailure = createAction(
  '[Comments/API] Delete Comment Failure',
  props<{ error: any }>()
);

/**
 * - Add comments
 */
export const addCommentSuccess = createAction(
  '[Comments/API] Add Comment Success',
  props<{ comment: Comment }>()
);

export const addCommentFailure = createAction(
  '[Comments/API] Add Comment Failure',
  props<{ error: any }>()
);

/**
 * - Add Reply
 * - commentId is id of the comment to which the reply is added
 */
export const addReplySuccess = createAction(
  '[Comments/API] Add Reply Success',
  props<{ commentId: number; comment: Comment }>()
);

export const addReplyFailure = createAction(
  '[Comments/API] Add Reply Failure',
  props<{ error: any }>()
);
