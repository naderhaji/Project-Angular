import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/authentification/login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./layouts/admin-layout/admin-layout.module').then(
        (l) => l.AdminLayoutModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./layouts/login-layout/login-layout.module').then(
        (l) => l.LoginLayoutModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
