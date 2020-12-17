import {Component, OnInit} from '@angular/core';
import IPost from "../../../../shared/interfaces/IPost";
import {PostService} from "../../../../services/post/post.service";
import {ActivatedRoute} from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-list-category-posts-admin',
  templateUrl: './list-category-posts-admin.component.html',
  styleUrls: ['./list-category-posts-admin.component.css']
})
export class ListCategoryPostsAdminComponent implements OnInit {

  public categoryName: string;
  private readonly categoryId: string;
  public posts: IPost[];

  constructor(private postAdminService: PostService, private activatedRoute: ActivatedRoute) {
    this.categoryId = this.activatedRoute.snapshot.params.categoryId;
  }

  async ngOnInit() {
    this.posts = await this.postAdminService.retrievePostsFromCategory(this.categoryId);
    this.posts.forEach(x => x.parsedCreated = moment(x.created).format("DD/MM/YYYY"))
  }

  public trackItem(index: number, item: IPost) {
    return item.objectId;
  }

  async onDeletePostClick(postId: string) {
    await this.postAdminService.deletePost(postId);
  }
}
