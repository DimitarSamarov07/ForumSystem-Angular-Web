import {Injectable} from '@angular/core';
import IUser from "../shared/interfaces/IUser";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userStore = Backendless.Data.of("Users")

  constructor() {
  }

  async getUserById(id) {
    return await this.userStore.findById(id);
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
      await Backendless.UserService.login(userData.username, userData.password, true);
      return true;
    } catch (e) {
      return false;
    }
  }

  async getCurrUser(): Promise<IUser> {
    return await Backendless.UserService.getCurrentUser<IUser>();
  }

  async logoutUser(): Promise<void> {
    await Backendless.UserService.logout();
  }
}
