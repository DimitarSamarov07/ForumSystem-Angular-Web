import {Component, Input, OnInit} from '@angular/core';
import IUser from "../../../../shared/interfaces/IUser";
import {UserService} from "../../../../user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-image-upload-modal',
  templateUrl: './profile-image-upload-modal.component.html',
  styleUrls: ['./profile-image-upload-modal.component.css']
})
export class ProfileImageUploadModalComponent implements OnInit {

  @Input()
  user: IUser;

  imgFile;
  imgRequiredErr = false;
  uploading = false;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  registerPhoto(event) {
    this.imgFile = event.target.files[0];
    this.imgRequiredErr = false;
  }

  async onUpdateClick() {
    if (!this.imgFile) {
      this.imgRequiredErr = true;
    } else {
      this.uploading = true;
      await this.userService.changeProfilePic(this.user, this.imgFile)
      await this.router.navigateByUrl("/profile/index/" + this.user.username);
      this.uploading = false;
    }
  }

}
