import { User } from '@lbk/auth/models';
import { createAction, props } from '@ngrx/store';
import { ReplyDto } from '../models';

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

export const addReply = createAction(
  '[Comments Page] Add Reply',
  props<{ replyDto: ReplyDto }>()
);
