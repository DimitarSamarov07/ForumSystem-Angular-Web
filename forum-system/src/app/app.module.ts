import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './core/header/header.component';
import {FooterComponent} from './core/footer/footer.component';
import {CoreModule} from "./core/core.module";
import {NotFoundComponent} from "./not-found/not-found.component";
import {UserModule} from "./user/user.module";
import {RouterModule} from "@angular/router";
import {HomeComponent} from './home/home.component';
import Backendless from 'backendless';
import {environment} from "../environments/environment";
import {AdminModule} from "./admin/admin.module";
import {MainLayoutComponent} from './main-layout/main-layout.component';

Backendless.initApp(environment.backendless.APP_ID, environment.backendless.API_KEY);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    CoreModule,
    UserModule,
    RouterModule
  ],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent],
})
export class AppModule {
}
