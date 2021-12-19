import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input
} from '@angular/core';

@Component({
  selector: 'lbk-score',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="inline-flex gap-2 bg-muted p-2 rounded-lg">
      <!-- plus -->
      <button (click)="add(1)" type="button" class="text-gray-400 px-2">
        <i class="fas fa-plus"></i>
      </button>
      <!-- end plus -->

      <p class="text-primary text-lg font-black">{{ score }}</p>

      <!-- minus -->
      <button (click)="add(-1)" type="button" class="text-gray-400 px-2">
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
  @Input() scoreChange = new EventEmitter<number>();

  add(value: number) {
    this.score = Math.min(Math.max(this.score + value, this.min), this.max);
    this.scoreChange.emit(this.score);
  }
}
