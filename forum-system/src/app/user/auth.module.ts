import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {LockoutComponent} from "./lockout/lockout.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {CoreModule} from "../core/core.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthGuard} from "../core/guards/auth.guard";
import {LogoutComponent} from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LockoutComponent, LogoutComponent],
  imports: [AuthRoutingModule, CoreModule, FormsModule, CommonModule, ReactiveFormsModule],
  providers: [AuthGuard]
})
export class AuthModule {}
