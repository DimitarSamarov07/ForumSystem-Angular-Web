import {Component, OnInit} from '@angular/core';
import ICategory from "../../../../shared/interfaces/ICategory";
import {CategoryService} from "../../../../services/category/category.service";
import {PageEvent} from "@angular/material/paginator";
import IFullCategoryListing from "../../../../shared/interfaces/IFullCategoryListing";

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  styleUrls: ['./category-index.component.css']
})
export class CategoryIndexComponent implements OnInit {

  categories: IFullCategoryListing[];
  dataReady = false;
  totalDataLength: number;
  loading = true;

  constructor(private categoryService: CategoryService) {
  }

  async ngOnInit() {
    this.totalDataLength = await this.categoryService.getCategoriesCount();
    this.categories = await this.categoryService.retrievePaginatedCategories(1, 5)
    this.loading = false;
  }

  public trackItem(index: number, item: ICategory) {
    return item.objectId;
  }

  async onPaginatorEvent($event: PageEvent) {
    this.loading = true;
    const page = $event.pageIndex;
    const size = $event.pageSize;
    this.categories = await this.categoryService.retrievePaginatedCategories(page + 1, size);
    this.loading = false;
  }

}
