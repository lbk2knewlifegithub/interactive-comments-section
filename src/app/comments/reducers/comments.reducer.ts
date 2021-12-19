import { CommentsApiActions, CommentsPageActions } from '@lbk/comments/actions';
import { Comment } from '@lbk/comments/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

export const commentsFeatureKey = 'comments';

export interface State extends EntityState<Comment> {
  /**
   * - When user requests delete comment (from comment list) this value to be non-null
   * - After delete comment request is completed this value to be null
   */
  deleteId?: number;
}

export const adapter: EntityAdapter<Comment> = createEntityAdapter<Comment>({
  selectId: (comment: Comment) => comment.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(CommentsPageActions.setDeleteId, (state, { id }) => ({
    ...state,
    deleteId: id,
  })),
  on(CommentsApiActions.loadCommentsSuccess, (state, { comments }) =>
    adapter.addMany(comments, state)
  ),
  on(CommentsApiActions.addCommentSuccess, (state, { comment }) =>
    adapter.addOne(comment, state)
  ),
  on(CommentsApiActions.deleteCommentSuccess, (state, { id }) => {
    const comment = state.entities[id];

    if (comment) {
      return adapter.removeOne(id, state);
    }

    // remove inside replies
    for (const entity of Object.values(state.entities)) {
      if (!entity) continue;
      if (entity.replies.length === 0) continue;

      const commentReply = entity.replies.find((reply) => reply.id === id);

      if (!commentReply) continue;

      return adapter.updateOne(
        {
          id: entity.id,
          changes: {
            replies: entity.replies.filter((reply) => reply.id !== id),
          },
        },
        state
      );
    }

    return state;
  })
);

export const deleteId = (state: State) => state.deleteId;
