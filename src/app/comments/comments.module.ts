import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentsRoutingModule } from './comments-routing.module';
import { CommentComponent, CommentListComponent } from './components';
import { ViewCommentsPageComponent } from './containers';

const COMPONENTS = [CommentListComponent, CommentComponent];
const CONTAINERS = [ViewCommentsPageComponent];

@NgModule({
  imports: [CommonModule, CommentsRoutingModule],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CommentsModule {}
