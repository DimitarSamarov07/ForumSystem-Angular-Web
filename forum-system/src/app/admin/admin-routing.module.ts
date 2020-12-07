import {RouterModule, Routes} from "@angular/router";
import {GlobalAdminAuthenticationGuard} from "../core/guards/global-admin-authentication.guard";
import {IndexCategoryComponent} from "./category/index-category/index-category.component";
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {CreateCategoryAdminComponent} from "./category/create-category-admin/create-category-admin.component";

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
            component: IndexCategoryComponent
          },
          {
            path: "create",
            component: CreateCategoryAdminComponent
          },
          // {
          //   path: "edit/:id"
          // }
        ]
      },
    ]
  }
]

export const AdminRoutingModule = RouterModule.forRoot(routes);
