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
  sortComparer: (a: Comment, b: Comment) => b.score - a.score,
});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  /**
   * - Up Score Success
   */

  on(CommentsApiActions.upScoreSuccess, (state, { commentId }) => {
    const comment = state.entities[commentId];
    if (!comment) return state;

    return adapter.updateOne(
      {
        id: commentId,
        changes: {score: comment.score + 1},
      },
      state
    );
  }),

  /**
   * - Down Score Success
   */

  on(CommentsApiActions.downScoreSuccess, (state, { commentId }) => {
    const comment = state.entities[commentId];
    if (!comment) return state;

    return adapter.updateOne(
      {
        id: commentId,
        changes: {score: Math.max(comment.score - 1, 0)},
      },
      state
    );
  }),

  /**
   * - Add Reply Success
   */
  on(CommentsApiActions.addReplySuccess, (state, { comment, commentId }) => {
    // reply sub
    for (const com of Object.values(state.entities)) {
      if (com?.replies.find((c) => (c.id = commentId))) {
        return adapter.updateOne(
          {
            id: com.id,
            changes: { replies: [...com.replies, comment] },
          },
          state
        );
      }
    }

    const parentComment = state.entities[commentId];

    if (!parentComment) return state;

    return adapter.updateOne(
      {
        id: parentComment.id,
        changes: { replies: [...parentComment.replies, comment] },
      },
      state
    );
  }),

  /**
   * - Set delete Id
   */
  on(CommentsPageActions.setDeleteId, (state, { id }) => ({
    ...state,
    deleteId: id,
  })),

  /**
   * - Load Comments Success
   */
  on(CommentsApiActions.loadCommentsSuccess, (state, { comments }) =>
    adapter.addMany(comments, state)
  ),

  /**
   * - Add Comment Success
   */
  on(CommentsApiActions.addCommentSuccess, (state, { comment }) =>
    adapter.addOne(comment, state)
  ),

  /**
   * - Delete Comment Success
   */
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
