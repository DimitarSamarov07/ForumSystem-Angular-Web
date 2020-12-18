import {NgModule} from "@angular/core";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {RouterModule} from "@angular/router";
import {IndexCategoryAdminComponent} from './category/index-category-admin/index-category-admin.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {GlobalAdminAuthenticationGuard} from "../../core/guards/global-admin-authentication.guard";
import {BrowserModule} from "@angular/platform-browser";
import {CoreModule} from "../../core/core.module";
import {UserModule} from "../../user/user.module";
import {CreateCategoryAdminComponent} from './category/create-category-admin/create-category-admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {CreatePostAdminComponent} from './post/create-post-admin/create-post-admin.component';
import {EditCategoryAdminComponent} from './category/edit-category-admin/edit-category-admin.component';
import {ListCategoryPostsAdminComponent} from './post/list-category-posts-admin/list-category-posts-admin.component';
import {EditorModule} from "@tinymce/tinymce-angular";
import {EditPostAdminComponent} from './post/edit-post-admin/edit-post-admin.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    IndexCategoryAdminComponent,
    MainMenuComponent,
    CreateCategoryAdminComponent,
    CreatePostAdminComponent,
    EditCategoryAdminComponent,
    ListCategoryPostsAdminComponent,
    EditPostAdminComponent
  ],
  imports: [
    RouterModule,
    AdminRoutingModule,
    MatProgressSpinnerModule,
    BrowserModule,
    CoreModule,
    UserModule,
    EditorModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [GlobalAdminAuthenticationGuard],
  bootstrap: [MainMenuComponent],
})
export class AdminModule {
}
