import {Component, OnInit} from '@angular/core';
import IPost from "../../../../shared/interfaces/IPost";
import {PostService} from "../../../../services/post/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-post-admin',
  templateUrl: './edit-post-admin.component.html',
  styleUrls: ['./edit-post-admin.component.css']
})
export class EditPostAdminComponent implements OnInit {

  post: IPost;
  form: FormGroup;
  postId: string;
  categoryId: string;
  isDataReady = false;

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) {

    this.postId = activatedRoute.snapshot.params.postId;
    this.categoryId = activatedRoute.snapshot.params.categoryId;
  }

  async ngOnInit() {
    this.post = await this.postService.retrievePost(this.postId);
    this.isDataReady = true;
    this.form = this.fb.group({
      title: [this.post.title, [Validators.minLength(5), Validators.maxLength(50)]],
      content: [this.post.content, [Validators.minLength(20), Validators.maxLength(1000)]],
    })
  }

  async onEditFormSubmit(form) {
    if (form.valid) {
      await this.postService.editPost({title: form.value.title, content: form.value.content}, this.postId)
      await this.router.navigateByUrl(`/administration/post/list/${this.categoryId}`)
    }
  }
}
