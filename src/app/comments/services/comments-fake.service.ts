import { Injectable } from '@angular/core';
import { User } from '@lbk/auth/models';
import { Comment } from '@lbk/comments/models';
import { fakeData } from '@lbk/comments/services/data';
import { Observable, of } from 'rxjs';
import { CommentsService } from './comments.service';

@Injectable({ providedIn: 'root' })
export class CommentsServiceFake implements CommentsService {
  getComments(): Observable<Comment[]> {
    return of(fakeData.comments);
  }

  deleteComment(id: number): Observable<boolean> {
    // some http call
    return of(true);
  }

  addComment(user: User, content: string): Observable<Comment> {
    const comments = fakeData.comments;
    const totalReply = comments.reduce(
      (acc, comment) => comment.replies.length + acc,
      0
    );

    const id = comments.length + totalReply;
    console.log('what the fuck' + id);

    // some http call
    const comment: Comment = {
      id,
      user,
      content,
      score: 0,
      replies: [],
      createdAt: '1 minutes ago',
    };

    fakeData.comments = [...comments, comment];

    return of(comment);
  }
}
