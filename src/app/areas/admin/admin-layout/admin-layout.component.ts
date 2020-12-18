import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs/operators";
import {UserService} from "../../../user/user.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
    this.router.events
      .pipe(
        // @ts-ignore
        filter(e => e instanceof NavigationEnd && this.router.getCurrentNavigation().previousNavigation),
        map(() => this.router.getCurrentNavigation().previousNavigation.finalUrl.toString()),
      )
      .subscribe((previousUrl) => {
        if (!previousUrl.includes("administration")) {
          window.location.reload();
        }
      });
  }

  async ngOnInit() {
    const currUser = await this.userService.getCurrUser();
    if (!currUser.isAdmin) {
      return this.router.navigateByUrl("/")
    }
  }

}
