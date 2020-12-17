import {Component, OnInit} from '@angular/core';
import ICategory from "../shared/interfaces/ICategory";
import {PostService} from "../services/post/post.service";
import {CategoryService} from "../services/category/category.service";
import IPost from "../shared/interfaces/IPost";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: ICategory[];
  latestPosts: IPost[];
  mostPopularPosts: IPost[];

  constructor(private postService: PostService,
              private categoryService: CategoryService) {
  }

  async ngOnInit() {
    this.categories = await this.categoryService.getNCategories(10);
    this.latestPosts = await this.postService.getLatestNPosts(10);
  }

}
