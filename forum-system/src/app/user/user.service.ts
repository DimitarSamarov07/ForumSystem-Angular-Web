import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor() {
  }

  async registerNewUser(userData) {
    const user = new Backendless.User();
    Object.assign(user, userData)
    await Backendless.UserService.register(user);
    await Backendless.UserService.login(userData.username, userData.password, true);
  }

  async verifyIfUserIsLoggedIn() {
    return await Backendless.UserService.isValidLogin();
  }

  async loginUser(userData): Promise<Boolean> {
    try {
      if (!userData.rememberMe) {
        userData.rememberMe = false;
      }
      const result = await Backendless.UserService.login(userData.username, userData.password, true);
      return true;
    } catch (e) {
      return false;
    }
  }

  async logoutUser(): Promise<void> {
    await Backendless.UserService.logout();
  }
}
