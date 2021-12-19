import { User } from '@lbk/auth/models';
import { Comment, ReplyDto } from '@lbk/comments/models';
import { Observable } from 'rxjs';

export interface CommentsService {
  getComments(): Observable<Comment[]>;

  deleteComment(id: number): Observable<boolean>;

  addComment(user: User, content: string): Observable<Comment>;

  addReply(
    replyDto: ReplyDto
  ): Observable<{ commentId: number; comment: Comment }>;
}
