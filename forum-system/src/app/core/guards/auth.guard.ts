import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "../../user/user.service";

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(private userService: UserService, private router: Router) {
  }

  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = state.url;
    if (url.includes("logout")){
      await this.router.navigateByUrl("/")
      return true;
    }
    return !await this.userService.verifyIfUserIsLoggedIn();
  }

}
