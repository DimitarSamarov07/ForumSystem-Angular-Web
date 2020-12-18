import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import IPost from "../../../../shared/interfaces/IPost";
import {PostService} from "../../../../services/post/post.service";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  form: FormGroup;
  postId: string;
  post: IPost;
  categoryId: string;
  loadingBtn = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private postService: PostService) {
    this.postId = this.activatedRoute.snapshot.params.postId;
    this.categoryId = this.activatedRoute.snapshot.params.categoryId;

    this.form = this.fb.group({
      content: ["", [Validators.minLength(20), Validators.maxLength(1000)]]
    })
  }

  async ngOnInit() {
    this.post = await this.postService.retrievePost(this.postId);
  }


  async onFormSubmit(formData) {
    if (formData.valid) {
      this.loadingBtn = true;
      await this.postService.editPostContent(formData.value.content, this.postId)
      this.loadingBtn = false;
      await this.router.navigateByUrl(`/post/${this.categoryId}/${this.postId}`)
    }
  }

}
