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
        [disabled]="score === max"
        (click)="up.emit()"
        type="button"
        class="text-gray-400 px-2 disabled:opacity-20 hover:text-primary"
      >
        <i class="fas fa-plus"></i>
      </button>
      <!-- end plus -->

      <p class="text-primary text-lg font-black">{{ score }}</p>

      <!-- minus -->
      <button
        [disabled]="score === min"
        (click)="down.emit()"
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
  @Output() up = new EventEmitter<void>();
  @Output() down = new EventEmitter<void>();
}
