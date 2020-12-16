import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {NotFoundComponent} from "./not-found/not-found.component";
import {UserModule} from "./user/user.module";
import {RouterModule} from "@angular/router";
import {HomeComponent} from './home/home.component';
import Backendless from 'backendless';
import {environment} from "../environments/environment";
import {AdminModule} from "./areas/admin/admin.module";
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {GlobalModule} from "./areas/global/global.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    RouterModule,
    GlobalModule,
    AdminModule,
    CoreModule,
    UserModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
