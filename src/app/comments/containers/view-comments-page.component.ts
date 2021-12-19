import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-view-comments-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <h1 class="bg-primary text-primary">View comments page</h1> `,
})
export class ViewCommentsPageComponent {}
