import {Injectable} from '@angular/core';
import IUser from "../shared/interfaces/IUser";
import {CloudinaryService} from "../services/shared/cloudinary.service";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userStore = Backendless.Data.of("Users")

  constructor(private cloudinaryService: CloudinaryService) {
  }

  async getUserById(id) {
    return await this.userStore.findById(id);
  }

  async changeProfilePic(user: IUser, file) {
    debugger;
    user.profileImageUrl = await this.cloudinaryService.uploadImage(file);
    await this.userStore.save(user);
  }

  async getUserByUsername(username) {
    const clause = `username = '${username}'`;
    const query = Backendless.DataQueryBuilder.create().setWhereClause(clause);

    try {
      return await this.userStore.findFirst<IUser>(query)
    } catch (e) {
      return null;
    }
  }

  async checkIfUserIsLoggedIn() {
    return await Backendless.UserService.isValidLogin();
  }

  async checkIfCurrUserIsAdmin() {
    const currUser = await this.getCurrUser();
    return currUser.isAdmin;
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
    try {
      return await Backendless.UserService.getCurrentUser<IUser>();
    } catch (e) {
      return null;
    }
  }

  async logoutUser(): Promise<void> {
    await Backendless.UserService.logout();
  }
}
