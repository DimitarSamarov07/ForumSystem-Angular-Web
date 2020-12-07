import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import ICategory from "../../../shared/interfaces/ICategory";
import {CategoryAdminService} from "../category-admin.service";
import {DOCUMENT} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-index-category',
  templateUrl: './index-category.component.html',
  styleUrls: ['./index-category.component.css']
})
export class IndexCategoryComponent implements OnInit {

  public categories: ICategory[];

  constructor(
    private categoryService: CategoryAdminService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private router: Router) {
  }

  async ngOnInit() {
    await this.loadCategories();

    let script = this._renderer2.createElement('script');
    script.type = `application/javascript`;
    script.text = `
    $(function () {
      $('#table').DataTable();
    });
        `;

    this._renderer2.appendChild(this._document.body, script);
  }

  async loadCategories() {
    debugger;
    this.categories = await this.categoryService.retrieveCategories();
  }

  public trackItem(index: number, item: ICategory) {
    return item.objectId;
  }

  async delete(title: string, objectId: string) {
    debugger;
    await this.categoryService.deleteCategoryById(objectId);
    await this.loadCategories();
  }
}
