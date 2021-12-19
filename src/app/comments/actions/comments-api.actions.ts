import { createAction } from '@ngrx/store';

export const loadCommentsSuccess = createAction(
  '[Comments/API] Load Comment Success'
);

export const loadCommentsFailure = createAction(
  '[Comments/API] Load Comment Failure'
);
