import {NgModule} from "@angular/core";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {RouterModule} from "@angular/router";
import {IndexCategoryAdminComponent} from './category/index-category-admin/index-category-admin.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {GlobalAdminAuthenticationGuard} from "../core/guards/global-admin-authentication.guard";
import {BrowserModule} from "@angular/platform-browser";
import {CoreModule} from "../core/core.module";
import {UserModule} from "../user/user.module";
import {CreateCategoryAdminComponent} from './category/create-category-admin/create-category-admin.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {CreatePostAdminComponent} from './post/create-post-admin/create-post-admin.component';
import {EditCategoryAdminComponent} from './category/edit-category-admin/edit-category-admin.component';
import {ListCategoryPostsAdminComponent} from './post/list-category-posts-admin/list-category-posts-admin.component';

@NgModule({
  declarations: [AdminLayoutComponent, IndexCategoryAdminComponent, MainMenuComponent, CreateCategoryAdminComponent, CreatePostAdminComponent, EditCategoryAdminComponent, ListCategoryPostsAdminComponent],
  imports: [
    RouterModule,
    AdminRoutingModule,
    BrowserModule,
    CoreModule,
    UserModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [GlobalAdminAuthenticationGuard],
  bootstrap: [MainMenuComponent],
})
export class AdminModule {
}
