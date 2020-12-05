import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent,
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes)
