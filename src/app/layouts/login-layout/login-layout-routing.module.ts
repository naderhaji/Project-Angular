import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
const routes: Routes = [
    {
        path: 'authentification',
        component: LoginLayoutComponent,
        // canActivate: [AuthGuardService],
        children: [
            {
                path: 'login',
                loadChildren: () => import('../../modules/login/login.module').then((c) => c.LoginModule),
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginLayoutRoutingModule {}
