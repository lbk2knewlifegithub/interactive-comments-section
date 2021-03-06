import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as fromComments from '@lbk/comments/reducers';
import { DialogModule } from '@lbk/shared/dialog';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommentsRoutingModule } from './comments-routing.module';
import {
  ButtonComponent,
  CommentActionsComponent,
  CommentComponent,
  CommentListComponent,
  ConfirmDeleteComponent,
  ContentCommentComponent,
  DeletePopupComponent,
  EditCommentComponent,
  EnterCommentComponent,
  ScoreComponent
} from './components';
import { ViewCommentsPageComponent } from './containers';
import { FocusDirective } from './directives';
import { CommentEffects } from './effects';

const COMPONENTS = [
  CommentListComponent,
  CommentComponent,
  ScoreComponent,
  ButtonComponent,
  EnterCommentComponent,
  DeletePopupComponent,
  ConfirmDeleteComponent,
  EditCommentComponent,
  FocusDirective,
  ContentCommentComponent,
  CommentActionsComponent,
];

const CONTAINERS = [ViewCommentsPageComponent];

@NgModule({
  imports: [
    CommonModule,
    CommentsRoutingModule,
    ReactiveFormsModule,
    DialogModule,
    StoreModule.forFeature(
      fromComments.commentsFeatureKey,
      fromComments.reducers
    ),
    EffectsModule.forFeature([CommentEffects]),
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CommentsModule {}
