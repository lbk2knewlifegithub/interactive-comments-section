import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { User } from '@lbk/auth/models';
import { slideIn, slideOut } from '@lbk/shared/animations';
import { Comment, Edit, ReplyDto } from '../models';

@Component({
  selector: 'lbk-comment-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div @listAnimation class="grid gap-4">
      <ng-container *ngFor="let comment of comments; trackBy: identifyComment">
        <lbk-comment
          @slideOut
          @slideIn
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
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0.1, transform: 'translateY(-100%)' }),
            stagger(200, [animate('0.5s')]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    slideOut({ delayLeave: 1200 }),
    slideIn({ delayEnter: 100 }),
  ],
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
