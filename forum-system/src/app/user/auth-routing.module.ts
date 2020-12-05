import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "../core/guards/auth.guard";
import {LogoutComponent} from "./logout/logout.component";

const routes: Routes = [
  {
    path: "user",
    canActivateChild: [AuthGuard],
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

export const AuthRoutingModule = RouterModule.forChild(routes);
