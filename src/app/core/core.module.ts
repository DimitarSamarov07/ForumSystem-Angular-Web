import {NgModule} from "@angular/core";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  providers: [HttpClientModule],
  exports: [HeaderComponent, FooterComponent],
  imports: [
    RouterModule,
    CommonModule
  ],
  bootstrap: [HeaderComponent, FooterComponent]
})
export class CoreModule {
}
