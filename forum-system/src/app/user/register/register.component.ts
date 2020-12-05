import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {rePasswordValidator} from "../../shared/validators";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  form: FormGroup;
  passwordControl : FormControl;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.passwordControl = this.fb.control("", [Validators.required, Validators.minLength(8), Validators.maxLength(30)])
    this.form = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ["", [Validators.required, Validators.email]],
      password: this.passwordControl,
      repeatPassword: ["", rePasswordValidator(this.passwordControl)],
    })
  }

  ngOnInit(): void {
  }


  async registerOnSubmit(formData) {
    if (formData.valid) {
      const {username, email, password} = formData.value;
      await this.userService.registerNewUser({username, email, password})
      await this.router.navigate(["/"]);
    }
  }
}
