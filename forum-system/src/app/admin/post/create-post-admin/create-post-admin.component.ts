import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PostAdminService} from "../post-admin.service";

@Component({
  selector: 'app-create-post-admin',
  templateUrl: './create-post-admin.component.html',
  styleUrls: ['./create-post-admin.component.css']
})
export class CreatePostAdminComponent implements OnInit {

  form: FormGroup;
  categoryId: string;

  constructor(private fb: FormBuilder,
              private postService: PostAdminService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.form = this.fb.group({
      title: ["", [Validators.minLength(5), Validators.maxLength(50)]],
      content: ["", [Validators.minLength(20), Validators.maxLength(1000)]],
    });

    this.categoryId = this.activatedRoute.snapshot.params.categoryId;
  }

  async ngOnInit() {
  }

  async onCreatePostFormSubmit(form) {
    if (form.valid) {
      const {objectId: userId} = await Backendless.UserService.getCurrentUser();
      await this.postService.createPost(form.value, this.categoryId, userId);
      await this.router.navigateByUrl("/administration/post/list/" + this.categoryId)
    }
  }


}
