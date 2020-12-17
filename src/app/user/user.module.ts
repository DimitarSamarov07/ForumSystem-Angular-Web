import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {LockoutComponent} from "./lockout/lockout.component";
import {CoreModule} from "../core/core.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthGuard} from "../core/guards/auth.guard";
import {LogoutComponent} from './logout/logout.component';
import {UserRoutingModule} from "./user-routing.module";

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LockoutComponent, LogoutComponent],
  imports: [CoreModule, FormsModule, CommonModule, ReactiveFormsModule, UserRoutingModule],
  providers: [AuthGuard]
})
export class UserModule {
}
