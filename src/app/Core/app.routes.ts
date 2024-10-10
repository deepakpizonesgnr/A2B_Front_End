import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../Feature/login/component/login.component';
import { NotFoundComponent } from './404-page/not-found/not-found.component';
// import { AuthGuard } from './guards/auth.guard';
import { MenuSyncComponent } from '../Feature/menu-sync/menu-sync.component';
import { SyncMenuComponent } from '../Feature/sync-menu/component/sync-menu.component';

export const routes: Routes = [
  // Add other loaded modules here

  { path: 'login', component: LoginComponent }, // Default route that redirects to login
  { path: 'sync', component: MenuSyncComponent }, // Default route that redirects to login
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route that redirects to login
  {
    path: 'view',
    loadChildren: () =>
      import('../Feature/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    // canActivate: [AuthGuard]
  },
  { path: 'sync-menu', component: SyncMenuComponent },
  { path: '**', component: NotFoundComponent }, // Wildcard route to catch any invalid URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
