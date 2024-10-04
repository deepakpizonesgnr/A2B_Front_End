import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../Feature/login/component/login.component';
import { NotFoundComponent } from './404-page/not-found/not-found.component';
import { DashboardComponent } from '../Feature/dashboard/component/dashboard.component';


export const routes: Routes = [  {
    path: 'dashboard',
    loadChildren: () => import('../Feature/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  
  // Add other loaded modules here
  { path: '', component: LoginComponent }, // Default route that redirects to login
  { path: 'dashboard' , component : DashboardComponent},
  { path: '**', component: NotFoundComponent }, // Wildcard route to catch any invalid URLs
 
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
