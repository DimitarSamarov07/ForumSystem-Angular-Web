import {RouterModule, Routes} from "@angular/router";
import {CategoryIndexComponent} from "./category/category-index/category-index.component";
import {MainLayoutComponent} from "../../core/main-layout/main-layout.component";
import {GlobalAreaAuthGuard} from "../../core/guards/global-area-auth.guard";
import {CategoryDetailsComponent} from "./category/category-details/category-details.component";
import {PostDetailsComponent} from "./post/post-details/post-details.component";
import {PostCreateComponent} from "./post/post-create/post-create.component";
import {PostEditComponent} from "./post/post-edit/post-edit.component";
import {CreateReplyComponent} from "./reply/create-reply/create-reply.component";
import {GlobalAuthenticationCanActivateGuard} from "../../core/guards/global-authentication-can-activate.guard";

const routes: Routes = [
  {
    path: "category",
    component: MainLayoutComponent,
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
    children: [
      {
        path: "details/:postId",
        component: PostDetailsComponent
      },
      {
        path: "create/:categoryId",
        component: PostCreateComponent,
        canActivate: [GlobalAuthenticationCanActivateGuard]
      },
      {
        path: "edit/:categoryId/:postId",
        component: PostEditComponent,
        canActivate: [GlobalAuthenticationCanActivateGuard]
      }
    ]
  },
  {
    path: "reply",
    component: MainLayoutComponent,
    canActivateChild: [GlobalAreaAuthGuard],
    children: [
      {
        path: "create/:postId",
        component: CreateReplyComponent,
      }
    ]
  }
];

export const GlobalRoutingModule = RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})
