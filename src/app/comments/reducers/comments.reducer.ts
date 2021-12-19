import { CommentsApiActions } from '@lbk/comments/actions';
import { Comment } from '@lbk/comments/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

export const commentsFeatureKey = 'comments';

export interface State extends EntityState<Comment> {}

export const adapter: EntityAdapter<Comment> = createEntityAdapter<Comment>({
  selectId: (comment: Comment) => comment.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(CommentsApiActions.loadCommentsSuccess, (state, { comments }) =>
    adapter.addMany(comments, state)
  )
);
