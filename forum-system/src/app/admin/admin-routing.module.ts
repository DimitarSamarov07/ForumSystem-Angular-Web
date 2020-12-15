import {RouterModule, Routes} from "@angular/router";
import {GlobalAdminAuthenticationGuard} from "../core/guards/global-admin-authentication.guard";
import {IndexCategoryAdminComponent} from "./category/index-category-admin/index-category-admin.component";
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {CreateCategoryAdminComponent} from "./category/create-category-admin/create-category-admin.component";
import {CreatePostAdminComponent} from "./post/create-post-admin/create-post-admin.component";
import {EditCategoryAdminComponent} from "./category/edit-category-admin/edit-category-admin.component";
import {ListCategoryPostsAdminComponent} from "./post/list-category-posts-admin/list-category-posts-admin.component";
import {EditPostAdminComponent} from "./post/edit-post-admin/edit-post-admin.component";

const routes: Routes = [
  {
    path: "administration",
    component: AdminLayoutComponent,
    canActivateChild: [GlobalAdminAuthenticationGuard],
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "/administration/category/list"
      },
      {
        path: "category",
        children: [
          {
            path: "list",
            component: IndexCategoryAdminComponent
          },
          {
            path: "create",
            component: CreateCategoryAdminComponent
          },
          {
            path: "edit/:categoryId",
            component: EditCategoryAdminComponent
          }
        ]
      },
      {
        path: "post",
        children: [
          {
            path: "create/:categoryId",
            component: CreatePostAdminComponent
          },
          {
            path: "list/:categoryId",
            component: ListCategoryPostsAdminComponent
          },
          {
            path: "edit/:categoryId/:postId",
            component: EditPostAdminComponent
          }
        ]
      }
    ]
  }
]

export const AdminRoutingModule = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });
