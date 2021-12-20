import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'lbk-comment-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="inline-flex gap-4">
      <!-- delete, edit button -->
      <ng-container *ngIf="isYou; else replyButton">
        <!-- delete -->
        <lbk-button (click)="delete.emit()" name="delete"></lbk-button>
        <!-- end delete -->

        <!-- edit -->
        <lbk-button (click)="edit.emit()" name="edit"></lbk-button>
        <!-- end edit -->
      </ng-container>
      <!-- end delete, edit button -->

      <!-- reply button -->
      <ng-template #replyButton>
        <lbk-button (click)="reply.emit()" name="reply"></lbk-button>
      </ng-template>
      <!-- end reply button -->
    </div>
  `,
})
export class CommentActionsComponent {
  @Input() isYou!: boolean;

  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() reply = new EventEmitter<void>();
}
