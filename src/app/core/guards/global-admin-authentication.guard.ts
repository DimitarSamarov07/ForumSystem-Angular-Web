import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from "../../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalAdminAuthenticationGuard implements CanActivateChild {
  constructor(private userService: UserService, private router: Router) {
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const isAdmin = await this.userService.checkIfCurrUserIsAdmin();
    if (!isAdmin) {
      await this.router.navigateByUrl("/")
      return false;
    }

    return true;
  }

}
