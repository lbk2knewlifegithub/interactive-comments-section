import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { User } from '@lbk/auth/models';
import { Comment, Edit, ReplyDto } from '@lbk/comments/models';
import { EditCommentComponent } from '..';

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
  @Output() edit = new EventEmitter<Edit>();
  @Output() up = new EventEmitter<number>();
  @Output() down = new EventEmitter<number>();

  @ViewChild(EditCommentComponent) editCommentComponent!: EditCommentComponent;

  replyingTo?: string;
  openEditPanel = false;

  get user(): User {
    return this.comment.user;
  }

  get avatar(): string {
    return this.comment.user.image.png;
  }

  /**
   * - When User click to edit to a comment,
   */
  onEdit(): void {
    this.openEditPanel = true;
  }

  /**
   * - When User click to reply to a comment,
   */
  onReply() {
    if (
      this.replyingTo &&
      confirm(
        `Are you sure you want to cancel your reply to ${this.comment.user.username} ?`
      )
    ) {
      this.replyingTo = undefined;
      return;
    }

    this.replyingTo = `@${this.comment.user.username} `;
  }

  get you(): boolean {
    if (!this.myUser) return false;
    return this.comment.user.username === this.myUser.username;
  }

  formatContent(content: string) {
    return content.substring(content.indexOf(' ')).trim();
  }

  sendReply(content: string) {
    this.replyingTo = undefined;
    this.reply.emit({
      myUser: this.myUser,
      content: this.formatContent(content),
      toUserName: this.user.username,
      toCommentId: this.comment.id,
    });
  }

  get content(): string {
    const tmp = this.comment.replyingTo;
    return `${tmp ? '@' + tmp + ' ' : ''}${this.comment.content}`;
  }

  onUpdate(): void {
    this.openEditPanel = false;
    const newContent = this.formatContent(
      this.editCommentComponent.formControl.value
    );

    this.edit.emit({ id: this.comment.id, content: newContent });
  }
}
