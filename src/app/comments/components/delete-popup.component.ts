import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { scaleInOut } from '@lbk/shared/animations';
import { fadeInOut } from '@lbk/shared/animations/fade.anim';

@Component({
  selector: 'lbk-delete-popup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="open"
      @fadeInOut
      class="fixed top-0 left-0l w-full h-screen grid place-content-center bg-black/20"
    >
      <div class="container">
        <lbk-confirm-delete
          (deleted)="deleted.emit($event)"
          class="block"
          @scaleInOut
        ></lbk-confirm-delete>
      </div>
    </div>
  `,
  animations: [
    fadeInOut({ delayEnter: 0, delayLeave: 300 }),
    scaleInOut({ delayEnter: 300, delayLeave: 0 }),
  ],
})
export class DeletePopupComponent {
  @Input() open = false;
  /**
   * - Emit true when the user confirm the deletion
   * - Emit false when the user cancel the deletion
   */
  @Output() deleted = new EventEmitter<boolean>();
}
