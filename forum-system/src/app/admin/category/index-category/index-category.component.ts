import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import ICategory from "../../../shared/interfaces/ICategory";
import {CategoryAdminService} from "../category-admin.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-index-category',
  templateUrl: './index-category.component.html',
  styleUrls: ['./index-category.component.css']
})
export class IndexCategoryComponent implements OnInit {

  public categories: ICategory[];

  constructor(
    private categoryService: CategoryAdminService, private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document) {
  }

  async ngOnInit() {
    this.categories = await this.categoryService.retrieveCategories();

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
