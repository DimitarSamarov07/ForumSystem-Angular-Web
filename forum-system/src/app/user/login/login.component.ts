import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  incorrectCredentials = false;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    })
  }

  ngOnInit(): void {
  }

  async loginOnSubmit(form): Promise<void> {
    if (!form.valid) {
      return;
    }

    const result = await this.userService.loginUser(form.value);
    if (!result) {
      this.incorrectCredentials = true;
      form.reset();
    } else {
      this.incorrectCredentials = false;
      await this.router.navigate(["/"]);
    }
  }
}
