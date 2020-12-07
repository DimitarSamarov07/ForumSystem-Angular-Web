import {NgModule} from "@angular/core";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {RouterModule} from "@angular/router";
import {IndexCategoryComponent} from './category/index-category/index-category.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {GlobalAdminAuthenticationGuard} from "../core/guards/global-admin-authentication.guard";
import {BrowserModule} from "@angular/platform-browser";
import {CoreModule} from "../core/core.module";
import {UserModule} from "../user/user.module";
import {CreateCategoryAdminComponent} from './category/create-category-admin/create-category-admin.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AdminLayoutComponent, IndexCategoryComponent, MainMenuComponent, CreateCategoryAdminComponent],
  imports: [
    RouterModule,
    AdminRoutingModule,
    BrowserModule,
    CoreModule,
    UserModule,
    ReactiveFormsModule,
    HttpClientModule
    // ReactiveFormsModule
  ],
  providers: [GlobalAdminAuthenticationGuard],
  bootstrap: [MainMenuComponent],
})
export class AdminModule {
}
