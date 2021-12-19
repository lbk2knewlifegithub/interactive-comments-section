import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="font-black text-sm inline-flex gap-2 items-center {{
        textColor
      }}  duration-150 hover:hidden"
    >
      <!-- <i class="fas fa-{{ icon }}"></i> -->
      <img [src]="src" [alt]="name" />

      <span>{{ name | titlecase }}</span>
    </button>
  `,
})
export class ButtonComponent {
  @Input() name: 'reply' | 'delete' | 'edit' = 'reply';

  // get icon(): string {
  //   if (this.name === 'delete') return 'trash';

  //   return this.name;
  // }

  get src(): string {
    return `assets/images/icon-${this.name}.svg`;
  }

  get textColor(): string {
    if (this.name === 'delete') return 'text-danger';
    return 'text-primary';
  }
}
