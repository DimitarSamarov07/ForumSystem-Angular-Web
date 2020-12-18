import {Component, OnInit} from '@angular/core';
import IUser from "../../../../shared/interfaces/IUser";
import {UserService} from "../../../../user/user.service";
import {ActivatedRoute} from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-profile-index',
  templateUrl: './profile-index.component.html',
  styleUrls: ['./profile-index.component.css']
})
export class ProfileIndexComponent implements OnInit {

  username: string;
  loading = true;
  user: IUser;
  currUser: IUser;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    this.username = activatedRoute.snapshot.params.username;
  }

  async ngOnInit() {
    this.user = await this.userService.getUserByUsername(this.username);
    this.currUser = await this.userService.getCurrUser();
    this.user.memberSince = moment(this.user.created).format("DD/MM/YYYY");
    this.loading = false;
  }

}
