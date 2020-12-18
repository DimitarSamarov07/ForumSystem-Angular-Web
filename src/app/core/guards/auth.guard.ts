import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "../../user/user.service";

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(private userService: UserService, private router: Router) {
  }

  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedIn = await this.userService.verifyIfUserIsLoggedIn();
    if (!isLoggedIn) {
      return true;
    }
    await this.router.navigateByUrl("/");
    return false;
  }

}
