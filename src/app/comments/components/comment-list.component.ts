import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@lbk/auth/models';
import { Comment } from '../models';

@Component({
  selector: 'lbk-comment-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-4">
      <ng-container *ngFor="let comment of comments; trackBy: identifyComment">
        <lbk-comment [username]="username" [comment]="comment"></lbk-comment>
      </ng-container>
    </div>
  `,
})
export class CommentListComponent {
  @Input() comments!: Comment[];
  @Input() username?: string;

  identifyComment(index: number, comment: Comment) {
    return comment.id;
  }
}
