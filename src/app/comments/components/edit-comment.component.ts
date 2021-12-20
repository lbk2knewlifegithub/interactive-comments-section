import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Comment } from '@lbk/comments/models';
import { persist } from '../validators';

@Component({
  selector: 'lbk-edit-comment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- <span
      #textarea
      [focus]="focus"
      class="inline-block p-4 overflow-hidden break-words border rounded-lg min-w-[300px] max-w-xs"
      role="textbox"
      contenteditable
      aria-placeholder="Add a comment.."
      [innerHtml]="content"
    ></span> -->

    <textarea
      class="overflow-visible"
      [focus]="true"
      [formControl]="formControl"
      cols="30"
      rows="10"
    ></textarea>
  `,
})
export class EditCommentComponent implements OnInit {
  @Input() comment!: Comment;
  formControl!: FormControl;

  ngOnInit(): void {
    this.formControl = new FormControl(this.content, [
      persist(this.replyingTo),
    ]);
  }

  get content() {
    return this.replyingTo + this.comment.content;
  }

  get replyingTo(): string {
    return this.comment.replyingTo ? `@${this.comment.replyingTo} ` : '';
  }

}
