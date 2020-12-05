import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './core/header/header.component';
import {FooterComponent} from './core/footer/footer.component';
import {CoreModule} from "./core/core.module";
import {CategoryAdminComponent} from './admin/category-admin/category-admin.component';
import {NotFoundComponent} from "./not-found/not-found.component";
import {AuthModule} from "./user/auth.module";
import {RouterModule} from "@angular/router";
import {HomeComponent} from './home/home.component';
import Backendless from 'backendless';
import {environment} from "../environments/environment";

Backendless.initApp(environment.backendless.APP_ID, environment.backendless.API_KEY);

@NgModule({
  declarations: [
    AppComponent,
    CategoryAdminComponent,
    NotFoundComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent],
})
export class AppModule {
}
