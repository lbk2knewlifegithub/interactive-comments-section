import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import * as fromComments from '@lbk/comments/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommentsRoutingModule } from './comments-routing.module';
import {
  CommentComponent,
  CommentListComponent,
  ScoreComponent
} from './components';
import { ViewCommentsPageComponent } from './containers';
import { CommentEffects } from './effects';

const COMPONENTS = [CommentListComponent, CommentComponent, ScoreComponent];
const CONTAINERS = [ViewCommentsPageComponent];

@NgModule({
  imports: [
    CommonModule,
    CommentsRoutingModule,
    StoreModule.forFeature(
      fromComments.commentsFeatureKey,
      fromComments.reducers
    ),
    EffectsModule.forFeature([CommentEffects]),
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CommentsModule {}
