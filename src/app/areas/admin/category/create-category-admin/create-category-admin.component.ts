import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CategoryAdminService} from "../../../../services/category/category-admin.service";

@Component({
  selector: 'app-create-category-admin',
  templateUrl: './create-category-admin.component.html',
  styleUrls: ['./create-category-admin.component.css']
})
export class CreateCategoryAdminComponent implements OnInit {

  form: FormGroup;
  private imgFile;
  imgRequiredErr = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private categoryAdminService: CategoryAdminService) {
    this.form = this.fb.group({
      title: ["", [Validators.minLength(6), Validators.maxLength(40)]],
      description: ["", [Validators.required, Validators.minLength(20), Validators.maxLength(300)]],
    })
  }

  ngOnInit(): void {
  }

  registerPhoto(event) {
    this.imgFile = event.target.files[0];
    this.imgRequiredErr = false;
  }

  async createCategoryOnFormSubmit(form) {
    if (form.valid && this.imgFile) {
      await this.categoryAdminService.createNewCategory(form.value, this.imgFile);
      await this.router.navigateByUrl("/administration/category/list")
    } else {
      if (!this.imgFile) {
        this.imgRequiredErr = true;
      }
      this.form.markAllAsTouched();
    }
  }
}
