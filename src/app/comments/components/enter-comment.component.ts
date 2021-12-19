import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@lbk/auth/models';

@Component({
  selector: 'lbk-enter-comment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit($event)"
      class="grid gap-8 bg-white p-4 mb-32"
    >
      <textarea
        formControlName="comment"
        placeholder="Add a comment.."
        cols="30"
        rows="3"
      ></textarea>

      <div class="flex justify-between items-center">
        <!-- user -->
        <a *ngIf="user" routerLink="/">
          <img
            class="w-8 h-8 rounded-full"
            [src]="avatar"
            [alt]="user.username"
          />
        </a>
        <!-- end user -->

        <!-- send button -->
        <button [disabled]="form.invalid" type="submit" class="btn btn-primary">
          Send
        </button>
        <!-- end send button -->
      </div>
    </form>
  `,
})
export class EnterCommentComponent implements OnInit {
  @Input() user?: User;
  @Output() enter = new EventEmitter<string>();
  form!: FormGroup;

  constructor(private readonly _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      comment: ['', [Validators.required]],
    });
  }

  get avatar(): string {
    return this.user!.image.webp;
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    // double check form validity
    if (this.form.invalid) return;

    this.enter.emit(this.form.value.comment);
    this.form.reset({ comment: '', });
  }
}
