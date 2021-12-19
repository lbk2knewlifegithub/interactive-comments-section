import { Injectable } from '@angular/core';
import { User } from '@lbk/auth/models';
import { Comment, ReplyDto } from '@lbk/comments/models';
import { fakeData } from '@lbk/comments/services/data';
import { Observable, of } from 'rxjs';
import { CommentsService } from './comments.service';

@Injectable({ providedIn: 'root' })
export class CommentsServiceFake implements CommentsService {
  comments = fakeData.comments;

  getComments(): Observable<Comment[]> {
    return of(fakeData.comments);
  }

  deleteComment(id: number): Observable<boolean> {
    // some http call
    return of(true);
  }

  private _createId(): number {
    const comments = fakeData.comments;
    const totalReply = comments.reduce(
      (acc, comment) => comment.replies.length + acc,
      0
    );
    return comments.length + totalReply;
  }

  private _findComment(comment_id: number): Comment | undefined {
    // find in main list
    return this.comments.find((comment) => comment.id === comment_id);

    // // find in replies
    // for (const c of this.comments) {
    //   const tmp = c.replies.find((com) => com.id === comment_id);
    //   if (tmp) return tmp;
    // }

    return undefined;
  }

  addComment(user: User, content: string): Observable<Comment> {
    const comments = fakeData.comments;
    // some http call
    const comment: Comment = {
      id: this._createId(),
      user,
      content,
      score: 0,
      replies: [],
      createdAt: '1 minutes ago',
    };

    fakeData.comments = [...comments, comment];

    return of(comment);
  }

  addReply(
    replyDto: ReplyDto
  ): Observable<{ commentId: number; comment: Comment }> {
    const { content, toUserName, myUser } = replyDto;
    const comment: Comment = {
      id: Math.floor(Math.random() * 99_999),
      replyingTo: toUserName,
      createdAt: '1 minutes ago',
      replies: [],
      score: 0,
      user: myUser,
      content,
    };

    return of({ commentId: replyDto.toCommentId, comment });
  }
}
