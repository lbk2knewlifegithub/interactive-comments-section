import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { User } from '@lbk/auth/models';
import { Comment } from '@lbk/comments/models';

@Component({
  selector: 'lbk-comment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <div class="grid gap-4 bg-white p-4 rounded-lg">
        <div class="flex items-center gap-4">
          <!-- avatar -->
          <img
            class="w-10 h-10 rounded-full"
            [src]="avatar"
            [alt]="user.username"
          />
          <!-- end avatar -->

          <div class="flex gap-2 items-center">
            <!-- user name -->
            <span class="font-black">{{ user.username }}</span>
            <!-- end user name -->

            <ng-container *ngIf="you">
              <span class="badge-primary">you</span>
            </ng-container>
          </div>

          <!-- created at -->
          <p>{{ comment.createdAt }}</p>
          <!-- end created at -->
        </div>

        <!-- content -->
        <p class="text-muted">
          <!-- replying to -->
          <span
            *ngIf="comment.replyingTo as replyingTo"
            class="text-primary font-black"
          >
            @{{ replyingTo }}
          </span>
          <!-- end replying to -->

          <span>{{ comment.content }}</span>
        </p>
        <!-- end content -->

        <div class="flex justify-between items-center">
          <!-- score -->
          <lbk-score [score]="comment.score"></lbk-score>
          <!-- end score -->

          <ng-container *ngIf="you; else reply">
            <div class="flex gap-4">
              <!-- delete -->
              <lbk-button
                (click)="delete.emit(comment.id)"
                name="delete"
              ></lbk-button>
              <!-- end delete -->

              <!-- edit -->
              <lbk-button name="edit"></lbk-button>
              <!-- end edit -->
            </div>
          </ng-container>

          <!-- reply -->
          <ng-template #reply>
            <lbk-button name="reply"></lbk-button>
          </ng-template>
          <!-- end reply -->
        </div>
      </div>

      <!-- replies -->
      <div class="mt-4 grid gap-4 border-l-2 border-gray-200 pl-4">
        <ng-container *ngFor="let reply of comment.replies">
          <lbk-comment
            (delete)="delete.emit($event)"
            [username]="username"
            [comment]="reply"
          ></lbk-comment>
        </ng-container>
      </div>
      <!-- end replies -->
    </div>
  `,
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Input() username?: string;
  @Output() delete = new EventEmitter<number>();

  get user(): User {
    return this.comment.user;
  }

  get avatar(): string {
    return this.comment.user.image.png;
  }

  get you(): boolean {
    if (!this.username) return false;

    return this.comment.user.username === this.username;
  }
}
