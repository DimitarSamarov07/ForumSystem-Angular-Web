import {Component, OnInit} from '@angular/core';
import IUser from "../../../../shared/interfaces/IUser";
import {UserService} from "../../../../user/user.service";
import IPost from "../../../../shared/interfaces/IPost";
import * as moment from "moment";
import {PostService} from "../../../../services/post/post.service";
import {ActivatedRoute} from "@angular/router";
import {VoteService} from "../../../../services/vote/vote.service";

@Component({
  selector: 'app-post-index',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  categoryId: string;
  postId: string;
  currUser: IUser;
  post: IPost;
  isCurrUserAuthor: boolean;
  dataReady = false;
  votesCount: number;

  constructor(private userService: UserService,
              private postService: PostService,
              private voteService: VoteService,
              private activatedRoute: ActivatedRoute) {
    this.postId = activatedRoute.snapshot.params.postId;
  }

  async ngOnInit() {
    this.currUser = await this.userService.getCurrUser()
    this.post = await this.postService.retrievePost(this.postId);
    this.categoryId = this.post.category.objectId;
    this.post.parsedCreated = this.getConvertedDate(this.post.created);
    this.isCurrUserAuthor = this.currUser.objectId === this.post.author.objectId;
    this.votesCount = await this.voteService.getPostVotesCount(this.postId);

    this.dataReady = true;
  }

  async sendVote(typeOfVote: boolean) {
    this.dataReady = false;
    const currUser = await Backendless.UserService.getCurrentUser();
    await this.voteService.registerVote(this.postId, currUser.objectId, typeOfVote);
    this.votesCount = await this.voteService.getPostVotesCount(this.postId);
    this.post = await this.postService.retrievePost(this.postId);
    this.dataReady = true;

  }

  getConvertedDate(created: string) {
    return moment(created).format("DD/MM/YYYY hh:mm:ss");
  }
}
