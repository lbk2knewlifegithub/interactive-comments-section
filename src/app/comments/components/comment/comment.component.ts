import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { User } from '@lbk/auth/models';
import { Comment, ReplyDto } from '@lbk/comments/models';

@Component({
  selector: 'lbk-comment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './comment.component.html',
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Input() myUser!: User;
  @Output() delete = new EventEmitter<number>();
  @Output() reply = new EventEmitter<ReplyDto>();

  @Output() up = new EventEmitter<number>();
  @Output() down = new EventEmitter<number>();

  openReplyPanel = false;
  replyContent = '';

  get user(): User {
    return this.comment.user;
  }

  get avatar(): string {
    return this.comment.user.image.png;
  }

  get you(): boolean {
    if (!this.myUser) return false;
    return this.comment.user.username === this.myUser.username;
  }

  createReply(content: string) {
    this.openReplyPanel = false;
    this.reply.emit({
      myUser: this.myUser,
      content,
      toUserName: this.user.username,
      toCommentId: this.comment.id,
    });
  }
}
