import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryAdminService} from "../../../../services/category/category-admin.service";
import ICategory from "../../../../shared/interfaces/ICategory";

@Component({
  selector: 'app-edit-category-admin',
  templateUrl: './edit-category-admin.component.html',
  styleUrls: ['./edit-category-admin.component.css']
})
export class EditCategoryAdminComponent implements OnInit {

  id: string;
  imgFile;
  form: FormGroup;
  data: ICategory;

  constructor(private fb: FormBuilder,
              private router: Router,
              private categoryAdminService: CategoryAdminService,
              private activatedRoute: ActivatedRoute) {

    this.id = this.activatedRoute.snapshot.params.categoryId;
  }

  async ngOnInit(): Promise<void> {
    this.data = await this.categoryAdminService.retrieveCategoryById(this.id);
    this.initForm();
  }

  async editCategoryOnFormSubmit(formData) {
    if (formData.valid) {
      if (this.imgFile) {
        await this.categoryAdminService.editCategoryById(this.id, formData.value, this.imgFile)
      } else {
        await this.categoryAdminService.editCategoryById(this.id, formData.value)
      }

      await this.router.navigateByUrl("/administration/category/list")
    }
  }

  initForm() {
    this.form = this.fb.group({
      title: [this.data.title, [Validators.minLength(6), Validators.maxLength(40)]],
      description: [this.data.description, [Validators.required, Validators.minLength(20), Validators.maxLength(300)]],
    })
  }

  registerPhoto(event) {
    this.imgFile = event.target.files[0];
  }
}
