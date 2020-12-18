import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from "../../user/user.service";

@Injectable()
export class GlobalAreaAuthGuard implements CanActivateChild {
  constructor(private router: Router, private userService: UserService) {
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const isValid = this.userService.checkIfUserIsLoggedIn()
    if (!isValid) {
      await Backendless.UserService.logout();
      await this.router.navigateByUrl("/");
      return false;
    }
    return true;

  }

}
