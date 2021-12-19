import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@lbk/auth/models';
import { Comment } from '@lbk/comments/models';

@Component({
  selector: 'lbk-comment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-4 bg-white p-4 rounded-lg">
      <div class="flex items-center gap-4">
        <!-- avatar -->
        <img
          class="w-10 h-10 rounded-full"
          [src]="avatar"
          [alt]="user.username"
        />
        <!-- end avatar -->

        <!-- user name -->
        <p class="font-black">{{ user.username }}</p>
        <!-- end user name -->

        <!-- created at -->
        <p>{{ comment.createdAt }}</p>
        <!-- end created at -->
      </div>

      <!-- content -->
      <p class="text-muted">{{ comment.content }}</p>
      <!-- end content -->

      <div>
        <!-- score -->
        <lbk-score [score]="comment.score"></lbk-score>
        <!-- end score -->

        <!-- replay -->
        <!-- end replay -->
      </div>
    </div>
  `,
})
export class CommentComponent {
  @Input() comment!: Comment;

  get user(): User {
    return this.comment.user;
  }

  get avatar(): string {
    return this.comment.user.image.png;
  }
}
