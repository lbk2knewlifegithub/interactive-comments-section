import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as fromComments from '@lbk/comments/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommentsRoutingModule } from './comments-routing.module';
import {
  ButtonComponent, CommentComponent,
  CommentListComponent, EnterCommentComponent, ScoreComponent
} from './components';
import { ViewCommentsPageComponent } from './containers';
import { CommentEffects } from './effects';

const COMPONENTS = [
  CommentListComponent,
  CommentComponent,
  ScoreComponent,
  ButtonComponent,
  EnterCommentComponent
];

const CONTAINERS = [ViewCommentsPageComponent];

@NgModule({
  imports: [
    CommonModule,
    CommentsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromComments.commentsFeatureKey,
      fromComments.reducers
    ),
    EffectsModule.forFeature([CommentEffects]),
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CommentsModule {}
