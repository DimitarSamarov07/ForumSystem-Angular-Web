import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "../core/guards/auth.guard";
import {MainLayoutComponent} from "../core/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: "user",
    canActivateChild: [AuthGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "login",
        component: LoginComponent
      }
    ]
  }
]

// @ts-ignore
export var UserRoutingModule = RouterModule.forChild(routes);
// @ts-ignore
