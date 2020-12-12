import {Component, OnInit} from '@angular/core';
import IPost from "../../../shared/interfaces/IPost";
import {PostAdminService} from "../post-admin.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-list-category-posts-admin',
  templateUrl: './list-category-posts-admin.component.html',
  styleUrls: ['./list-category-posts-admin.component.css']
})
export class ListCategoryPostsAdminComponent implements OnInit {

  public categoryName: string;
  private categoryId: string;
  public posts: IPost[];

  constructor(private postAdminService: PostAdminService, private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    this.posts = await this.postAdminService.retrievePostsFromCategory(this.activatedRoute.snapshot.params.categoryId);
  }

  onDeletePostClick(postId: string) {

  }
}
