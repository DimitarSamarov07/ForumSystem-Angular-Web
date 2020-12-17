import {RouterModule, Routes} from "@angular/router";
import {CategoryIndexComponent} from "./category/category-index/category-index.component";
import {MainLayoutComponent} from "../../main-layout/main-layout.component";
import {GlobalAreaAuthGuard} from "../../core/guards/global-area-auth-guard.service";
import {CategoryDetailsComponent} from "./category/category-details/category-details.component";
import {PostDetailsComponent} from "./posts/post-details/post-details.component";

const routes: Routes = [
  {
    path: "category",
    component: MainLayoutComponent,
    canActivateChild: [GlobalAreaAuthGuard],
    children: [
      {
        path: "list",
        component: CategoryIndexComponent
      },
      {
        path: "details/:categoryId",
        component: CategoryDetailsComponent
      }
    ]
  },
  {
    path: "post",
    component: MainLayoutComponent,
    canActivateChild: [GlobalAreaAuthGuard],
    children: [
      {
        path: "details/:postId",
        component: PostDetailsComponent
      }
    ]
  }
];

export const GlobalRoutingModule = RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})
