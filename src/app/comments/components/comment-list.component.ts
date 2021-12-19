import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Comment } from '../models';

@Component({
  selector: 'lbk-comment-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-4">
      <ng-container *ngFor="let comment of comments; trackBy: identifyComment">
        <lbk-comment (delete)="delete.emit($event)" [username]="username" [comment]="comment"></lbk-comment>
      </ng-container>
    </div>
  `,
})
export class CommentListComponent {
  @Input() comments!: Comment[];
  @Input() username?: string;
  @Output() delete = new EventEmitter<number>();

  identifyComment(index: number, comment: Comment) {
    return comment.id;
  }
}
