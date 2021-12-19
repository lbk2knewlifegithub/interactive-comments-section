import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { User } from '@lbk/auth/models';
import { Comment, ReplyDto } from '../models';

@Component({
  selector: 'lbk-comment-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-4">
      <ng-container *ngFor="let comment of comments; trackBy: identifyComment">
        <lbk-comment
          (reply)="reply.emit($event)"
          (delete)="delete.emit($event)"
          [myUser]="myUser"
          [comment]="comment"
        ></lbk-comment>
      </ng-container>
    </div>
  `,
})
export class CommentListComponent {
  @Input() comments!: Comment[];
  @Input() myUser!: User;
  @Output() delete = new EventEmitter<number>();
  @Output() reply = new EventEmitter<ReplyDto>();

  identifyComment(index: number, comment: Comment) {
    return comment.id;
  }

}
