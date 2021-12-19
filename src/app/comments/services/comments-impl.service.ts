import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@lbk/auth/models';
import { Comment } from '@lbk/comments/models';
import { Observable } from 'rxjs';
import { CommentsService } from './comments.service';

@Injectable({ providedIn: 'root' })
export class CommentsServiceImpl implements CommentsService {
  constructor(private readonly _http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    throw new Error('Not implemented');
  }

  deleteComment(id: number): Observable<boolean> {
    throw new Error('Not implemented');
  }

  addComment(user: User, content: string): Observable<Comment> {
    throw new Error('Not implemented');
  }
}
