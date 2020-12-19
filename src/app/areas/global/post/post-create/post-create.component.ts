import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../../../services/post/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import ICategory from "../../../../shared/interfaces/ICategory";
import {CategoryService} from "../../../../services/category/category.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  form: FormGroup;
  categoryId: string;
  category: ICategory;
  loading = false;

  constructor(private fb: FormBuilder,
              private postService: PostService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.categoryId = this.activatedRoute.snapshot.params.categoryId;
    this.form = this.fb.group({
      title: ["", [Validators.minLength(5), Validators.maxLength(50)]],
      content: ["", [Validators.minLength(20), Validators.maxLength(1000)]],
    });
  }

  async ngOnInit() {
    this.category = await this.categoryService.retrieveCategoryById(this.categoryId);
  }

  async onFormSubmit(formData) {
    if (formData.valid) {
      this.loading = true;
      const {objectId: userId} = await Backendless.UserService.getCurrentUser();
      const newPostId = await this.postService.createPost(formData.value, this.categoryId, userId);
      await this.router.navigateByUrl(`/post/details/${newPostId}`)
    }

  }

}
