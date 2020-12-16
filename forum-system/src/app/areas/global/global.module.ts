import {NgModule} from "@angular/core";
import {CoreModule} from "../../core/core.module";
import {GlobalRoutingModule} from "./global.routing.module";
import {CategoryIndexComponent} from "./category/category-index/category-index.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CommonModule} from "@angular/common";
import {CategoryDetailsComponent} from "./category/category-details/category-details.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [CategoryIndexComponent, CategoryDetailsComponent],
  imports: [
    CoreModule,
    GlobalRoutingModule,
    MatPaginatorModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class GlobalModule {

}
