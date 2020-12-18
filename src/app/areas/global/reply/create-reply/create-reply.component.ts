import {Component, OnInit} from '@angular/core';
import {ReplyService} from "../../../../services/reply/reply.service";
import {ActivatedRoute, Router} from "@angular/router";
import IUser from "../../../../shared/interfaces/IUser";
import {UserService} from "../../../../user/user.service";
import IPost from "../../../../shared/interfaces/IPost";
import {PostService} from "../../../../services/post/post.service";
import * as moment from "moment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-reply',
  templateUrl: './create-reply.component.html',
  styleUrls: ['./create-reply.component.css']
})
export class CreateReplyComponent implements OnInit {

  post: IPost
  postId: string;
  currUser: IUser;
  form: FormGroup
  loadingSpinnerBtn = false;

  constructor(private replyService: ReplyService,
              private userService: UserService,
              private postService: PostService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {
    this.postId = activatedRoute.snapshot.params.postId;
    this.form = this.fb.group({
      content: ["", [Validators.minLength(20), Validators.maxLength(1000)]],
    })
  }

  async ngOnInit() {
    this.currUser = await this.userService.getCurrUser();
    this.post = await this.postService.retrievePost(this.postId);
    this.post.parsedCreated = moment(this.post.created).format("DD/MM/YYYY hh:mm:ss")
  }

  async onFormSubmit(formData) {
    if (formData.valid) {
      this.loadingSpinnerBtn = true;
      await this.replyService.createReply(this.postId, this.currUser.objectId, formData.value.content);
      this.loadingSpinnerBtn = false;
      await this.router.navigateByUrl("/post/details/" + this.postId);
    }
  }

}
