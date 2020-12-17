import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "../core/guards/auth.guard";
import {LogoutComponent} from "./logout/logout.component";
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
      },
      {
        path: "logout",
        component: LogoutComponent,
      }
    ]
  }
]

// @ts-ignore
export var UserRoutingModule = RouterModule.forChild(routes);
// @ts-ignore
