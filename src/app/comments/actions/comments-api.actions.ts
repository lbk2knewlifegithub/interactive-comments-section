import { Comment } from '@lbk/comments/models';
import { createAction, props } from '@ngrx/store';

export const loadCommentsSuccess = createAction(
  '[Comments/API] Load Comment Success',
  props<{ comments: Comment[] }>()
);

export const loadCommentsFailure = createAction(
  '[Comments/API] Load Comment Failure',
  props<{ error: any }>()
);
