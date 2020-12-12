import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import ICategory from "../../../shared/interfaces/ICategory";
import {CategoryAdminService} from "../category-admin.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-index-category',
  templateUrl: './index-category-admin.component.html',
  styleUrls: ['./index-category-admin.component.css'],
})
export class IndexCategoryAdminComponent implements OnInit {

  public categories: ICategory[];

  constructor(
    private categoryService: CategoryAdminService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document) {
  }

  async ngOnInit() {
    await this.loadCategories();
    this.activateDataTables();
  }

  async loadCategories() {
    this.categories = await this.categoryService.retrieveCategories();
  }

  public trackItem(index: number, item: ICategory) {
    return item.objectId;
  }

  async delete(title: string, objectId: string) {
    await this.categoryService.deleteCategoryById(objectId);
    await this.loadCategories();
  }

  private activateDataTables() {
    let script = this._renderer2.createElement('script');
    script.type = `application/javascript`;
    script.text = `
    $(function () {
      $('#table').DataTable();
    });
        `;

    this._renderer2.appendChild(this._document.body, script);
  }
}
