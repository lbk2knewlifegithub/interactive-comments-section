import { User } from '@lbk/auth/models';
import { createAction, props } from '@ngrx/store';

export const enter = createAction('[Comments Page] Enter');

export const setDeleteId = createAction(
  '[Comments Page] Set Delete Id',
  props<{ id?: number }>()
);

export const deleteComment = createAction(
  '[Comments Page] Delete Comment',
  props<{ id: number }>()
);

export const addComment = createAction(
  '[Comments Page] Add Comment',
  props<{ user: User; content: string }>()
);
