import {NgModule} from "@angular/core";
import {CoreModule} from "../../core/core.module";
import {GlobalRoutingModule} from "./global.routing.module";
import {CategoryIndexComponent} from "./category/category-index/category-index.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [CategoryIndexComponent],
  imports: [
    CoreModule,
    GlobalRoutingModule,
    MatPaginatorModule,
    CommonModule
  ],
  exports: []
})
export class GlobalModule {

}
