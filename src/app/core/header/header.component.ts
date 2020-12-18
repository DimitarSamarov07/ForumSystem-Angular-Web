import {Component, OnInit} from '@angular/core';
import IUser from "../../shared/interfaces/IUser";
import {Router} from "@angular/router";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user?: IUser
  isAdmin: boolean;

  constructor(private userService: UserService, private router: Router) {
  }

  async ngOnInit() {
    this.user = await this.userService.getCurrUser();
    this.isAdmin = this.user?.isAdmin;
  }

  async logout() {
    await this.userService.logoutUser();
    await this.router.navigateByUrl("/");
  }

}
