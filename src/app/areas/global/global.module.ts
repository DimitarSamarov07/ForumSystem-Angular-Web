import {NgModule} from "@angular/core";
import {CoreModule} from "../../core/core.module";
import {GlobalRoutingModule} from "./global.routing.module";
import {CategoryIndexComponent} from "./category/category-index/category-index.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CommonModule} from "@angular/common";
import {CategoryDetailsComponent} from "./category/category-details/category-details.component";
import {ReactiveFormsModule} from "@angular/forms";
import {PostDetailsComponent} from "./post/post-details/post-details.component";
import {PostEditComponent} from "./post/post-edit/post-edit.component";
import {EditorModule} from "@tinymce/tinymce-angular";
import {PostCreateComponent} from "./post/post-create/post-create.component";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CreateReplyComponent} from "./reply/create-reply/create-reply.component";
import {GlobalAuthenticationCanActivateGuard} from "../../core/guards/global-authentication-can-activate.guard";
import {GlobalAreaAuthGuard} from "../../core/guards/global-area-auth.guard";
import {EditReplyComponent} from "./reply/edit-reply/edit-reply.component";
import {ProfileIndexComponent} from "./profile/profile-index/profile-index.component";
import {ProfileImageUploadModalComponent} from "./profile/profile-image-upload-modal/profile-image-upload-modal.component";

@NgModule({
  declarations: [
    CategoryIndexComponent,
    CategoryDetailsComponent,
    PostDetailsComponent,
    PostEditComponent,
    PostCreateComponent,
    CreateReplyComponent,
    EditReplyComponent,
    ProfileIndexComponent,
    ProfileImageUploadModalComponent
  ],
  providers: [GlobalAreaAuthGuard, GlobalAuthenticationCanActivateGuard],
  imports: [
    CoreModule,
    GlobalRoutingModule,
    MatPaginatorModule,
    CommonModule,
    ReactiveFormsModule,
    EditorModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports: []
})
export class GlobalModule {

}
