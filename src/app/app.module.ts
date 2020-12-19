import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {NotFoundComponent} from "./core/not-found/not-found.component";
import {UserModule} from "./user/user.module";
import {RouterModule} from "@angular/router";
import {HomeComponent} from './home/home.component';
import Backendless from 'backendless';
import {environment} from "../environments/environment";
import {AdminModule} from "./areas/admin/admin.module";
import {MainLayoutComponent} from './core/main-layout/main-layout.component';
import {GlobalModule} from "./areas/global/global.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpsOnlyInterceptor} from "./interceptors/https-only.interceptor";
import {CacheInterceptor} from "./interceptors/cache.interceptor";

Backendless.initApp(environment.backendless.APP_ID, environment.backendless.API_KEY);

const interceptorProvider = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpsOnlyInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true}]

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
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {
}
