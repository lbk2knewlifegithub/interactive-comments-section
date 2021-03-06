import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Comment } from '@lbk/comments/models';

@Component({
  selector: 'lbk-content-comment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- content -->
    <p class="text-muted">
      <!-- replying to -->
      <a
        routerLink="/"
        *ngIf="comment.replyingTo as replyingTo"
        class="font-black text-primary"
      >
        @{{ replyingTo }}
      </a>
      <!-- end replying to -->

      <span>{{ comment.content }}</span>
    </p>
    <!-- end content -->
  `,
})
export class ContentCommentComponent {
  @Input() comment!: Comment;
}
