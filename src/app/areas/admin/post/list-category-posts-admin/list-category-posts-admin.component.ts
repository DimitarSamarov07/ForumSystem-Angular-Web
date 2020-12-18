import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import IPost from "../../../../shared/interfaces/IPost";
import {PostService} from "../../../../services/post/post.service";
import {ActivatedRoute} from "@angular/router";
import * as moment from 'moment';
import {DOCUMENT} from "@angular/common";
import {CategoryService} from "../../../../services/category/category.service";

@Component({
  selector: 'app-list-category-posts-admin',
  templateUrl: './list-category-posts-admin.component.html',
  styleUrls: ['./list-category-posts-admin.component.css']
})
export class ListCategoryPostsAdminComponent implements OnInit {

  public categoryName: string;
  private readonly categoryId: string;
  public posts: IPost[];
  loading = true;

  constructor(private postAdminService: PostService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private _renderer2: Renderer2,
              @Inject(DOCUMENT) private _document: Document) {
    this.categoryId = this.activatedRoute.snapshot.params.categoryId;
  }

  async ngOnInit() {
    await this.loadData()
  }

  async loadData() {
    this.loading = true;
    const {title} = await this.categoryService.retrieveCategoryById(this.categoryId)
    this.categoryName = title;
    this.posts = await this.postAdminService.retrievePostsFromCategory(this.categoryId);
    this.posts.forEach(x => x.parsedCreated = moment(x.created).format("DD/MM/YYYY hh:mm:ss"))
    this.loading = false;
  }

  public trackItem(index: number, item: IPost) {
    return item.objectId;
  }

  async onDeletePostClick(postId: string) {
    await this.postAdminService.deletePost(postId);
    await this.loadData();
  }

}
