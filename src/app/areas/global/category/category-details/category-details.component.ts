import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../../../services/post/post.service";
import IPost from "../../../../shared/interfaces/IPost";
import ICategoryDetailsList from "../../../../shared/interfaces/ICategoryDetailsList";
import {ActivatedRoute} from "@angular/router";
import * as moment from "moment";
import {PageEvent} from "@angular/material/paginator";

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

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private activatedRoute: ActivatedRoute) {
    this.categoryId = activatedRoute.snapshot.params.categoryId;
    this.searchForm = fb.group({
      query: ["", [Validators.required, Validators.minLength(2)]]
    })
  }

  async ngOnInit() {
    debugger;
    console.log("hi")
    console.log(this.categoryId)
    this.category = await this.postService.paginatePostsFromCategory(this.categoryId, 0, 10)
    this.totalDataLength = await this.postService.getCountOfCategoryPosts(this.categoryId);
  }

  public trackItem(index: number, item: IPost) {
    return item.objectId;
  }

  clearThis(target) {
    target.value = "";
  }

  onSearchFormSubmit(form) {

  }

  getConvertedDate(created: string) {
    return moment(created).format("DD/MM/YYYY hh:mm:ss");
  }

  async onPaginatorEvent($event: PageEvent) {
    debugger;
    const page = $event.pageIndex;
    const size = $event.pageSize;
    this.category = await this.postService.paginatePostsFromCategory(this.categoryId, page, size);
  }
}
