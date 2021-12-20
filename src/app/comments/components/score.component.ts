import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'lbk-score',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="inline-flex gap-2 bg-muted p-2 rounded-lg">
      <!-- plus -->
      <button
        [disabled]="disable || hasBeenUpScore || score === max"
        (click)="plus()"
        type="button"
        class="text-gray-400 px-2 disabled:opacity-20 hover:text-primary"
      >
        <i class="fas fa-plus"></i>
      </button>
      <!-- end plus -->

      <p class="text-primary text-lg font-black">{{ score }}</p>

      <!-- minus -->
      <button
        [disabled]="disable || hasBeenDownScore || score === min"
        (click)="minus()"
        type="button"
        class="text-gray-400 px-2 disabled:opacity-20 hover:text-primary"
      >
        <i class="fas fa-minus"></i>
      </button>
      <!-- end minus -->
    </div>
  `,
})
export class ScoreComponent {
  @Input() score!: number;
  @Input() min = 0;
  @Input() max = 10_000;
  @Input() disable = false;
  @Output() up = new EventEmitter<void>();
  @Output() down = new EventEmitter<void>();
  hasBeenUpScore = false;
  hasBeenDownScore = false;

  plus() {
    if(this.hasBeenUpScore) return;


    this.up.emit();
    this.hasBeenUpScore = true;
  }

  minus() {
    if(this.hasBeenDownScore) return;


    this.down.emit();
    this.hasBeenDownScore = true;
  }
}
