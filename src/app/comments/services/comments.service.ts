import { User } from '@lbk/auth/models';
import { Comment, Edit, ReplyDto } from '@lbk/comments/models';
import { Observable } from 'rxjs';

export interface CommentsService {
  getComments(): Observable<Comment[]>;

  deleteComment(id: number): Observable<boolean>;

  addComment(user: User, content: string): Observable<Comment>;

  editComment(edit: Edit): Observable<boolean>;

  addReply(
    replyDto: ReplyDto
  ): Observable<{ commentId: number; comment: Comment }>;

  upScore(commentId: number): Observable<boolean>;

  downScore(commentId: number): Observable<boolean>;
}
