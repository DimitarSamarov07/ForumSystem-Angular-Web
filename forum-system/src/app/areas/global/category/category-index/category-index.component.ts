import {Component, OnInit} from '@angular/core';
import ICategory from "../../../../shared/interfaces/ICategory";
import {CategoryService} from "../category.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  styleUrls: ['./category-index.component.css']
})
export class CategoryIndexComponent implements OnInit {

  categories: ICategory[];
  dataReady = false;
  totalDataLength: number;

  constructor(private categoryService: CategoryService) {
  }

  async ngOnInit() {
    this.totalDataLength = await this.categoryService.getCategoriesCount();
    this.categories = await this.categoryService.retrievePaginatedCategories(1, 5)
  }

  public trackItem(index: number, item: ICategory) {
    return item.objectId;
  }

  async onPaginatorEvent($event: PageEvent) {
    debugger;
    const page = $event.pageIndex;
    const size = $event.pageSize;
    this.categories = await this.categoryService.retrievePaginatedCategories(page + 1, size);
  }

}
