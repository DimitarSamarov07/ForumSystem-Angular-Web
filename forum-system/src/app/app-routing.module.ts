import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {HomeComponent} from "./home/home.component";
import {MainLayoutComponent} from "./main-layout/main-layout.component";

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [{
      path: "",
      pathMatch: "full",
      component: HomeComponent,
    },
      {
        path: "**",
        component: NotFoundComponent
      }
    ]
  },

];

export const AppRoutingModule = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
