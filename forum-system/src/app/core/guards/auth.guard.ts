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
      return true;
    }
    const result = !await this.userService.verifyIfUserIsLoggedIn();
    console.log(result);
    return result;
  }

}
