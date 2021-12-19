import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '@lbk/comments/models';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  constructor(private readonly _http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this._http
      .get<any>('assets/data.json')
      .pipe(map((response) => response.comments as Comment[]));
  }
}
