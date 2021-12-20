import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { scaleInOut } from '@lbk/shared/animations';
import { fadeInOut } from '@lbk/shared/animations/fade.anim';
import { Dialog } from '@lbk/shared/dialog';

@Component({
  selector: 'lbk-cancel-reply-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-dialog-ng-content class="fixed" [open]="open">
      <lbk-dialog
        (confirmed)="deleted.emit($event)"
        [dialog]="dialog"
      ></lbk-dialog>
    </lbk-dialog-ng-content>
  `,
  animations: [
    fadeInOut({ delayEnter: 0, delayLeave: 300 }),
    scaleInOut({ delayEnter: 300, delayLeave: 0 }),
  ],
})
export class CancelReplyDialogComponent {
  @Input() open = false;
  /**
   * - Emit true when the user confirm the deletion
   * - Emit false when the user cancel the deletion
   */
  @Output() deleted = new EventEmitter<boolean>();

  dialog: Dialog = {
    title: 'Delete comment',
    message:
      "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
    confirmedButtonText: 'delete',
  };
}
