import {RouterModule, Routes} from "@angular/router";
import {CategoryIndexComponent} from "./category/category-index/category-index.component";
import {MainLayoutComponent} from "../../main-layout/main-layout.component";
import {UserAreaGuard} from "../../core/guards/user-area.guard";

const routes: Routes = [
  {
    path: "category",
    component: MainLayoutComponent,
    canActivateChild: [UserAreaGuard],
    children: [{
      path: "list",
      component: CategoryIndexComponent
    }]
  }];

export const GlobalRoutingModule = RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})
