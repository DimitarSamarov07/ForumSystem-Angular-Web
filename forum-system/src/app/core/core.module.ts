import {NgModule} from "@angular/core";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  providers: [HttpClientModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {
}
