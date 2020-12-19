import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../../../services/post/post.service";
import IPost from "../../../../shared/interfaces/IPost";
import ICategoryDetailsList from "../../../../shared/interfaces/ICategoryDetailsList";
import {ActivatedRoute} from "@angular/router";
import * as moment from "moment";
import {PageEvent} from "@angular/material/paginator";
import IUser from "../../../../shared/interfaces/IUser";
import {UserService} from "../../../../user/user.service";

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  searchForm: FormGroup;
  categoryId: string;
  totalDataLength: number;
  category: ICategoryDetailsList;
  currUser: IUser
  paginating = true;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    this.categoryId = activatedRoute.snapshot.params.categoryId;
    this.searchForm = fb.group({
      query: ["", [Validators.required, Validators.minLength(2)]]
    })
  }

  async ngOnInit() {
    this.currUser = await this.userService.getCurrUser();
    this.category = await this.postService.paginatePostsFromCategory(this.categoryId, 0, 10)
    this.totalDataLength = await this.postService.getCountOfCategoryPosts(this.categoryId);

    this.paginating = false;
  }

  public trackItem(index: number, item: IPost) {
    return item.objectId;
  }

  clearThis(target) {
    target.value = "";
  }

  getConvertedDate(created: string) {
    return moment(created).format("DD/MM/YYYY hh:mm:ss");
  }

  async onPaginatorEvent($event: PageEvent) {
    this.paginating = true;
    const page = $event.pageIndex;
    const size = $event.pageSize;
    this.category = await this.postService.paginatePostsFromCategory(this.categoryId, page, size);
    this.paginating = false;
  }
}
