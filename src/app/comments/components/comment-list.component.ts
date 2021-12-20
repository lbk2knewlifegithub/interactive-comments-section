import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { User } from '@lbk/auth/models';
import { Comment, Edit, ReplyDto } from '../models';

@Component({
  selector: 'lbk-comment-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-4">
      <ng-container *ngFor="let comment of comments; trackBy: identifyComment">
        <lbk-comment
          [myUser]="myUser"
          [comment]="comment"
          (reply)="reply.emit($event)"
          (delete)="delete.emit($event)"
          (edit)="edit.emit($event)"
          (up)="up.emit($event)"
          (down)="down.emit($event)"
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
  @Output() up = new EventEmitter<number>();
  @Output() down = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Edit>();

  identifyComment(index: number, comment: Comment) {
    return comment.id;
  }

}
