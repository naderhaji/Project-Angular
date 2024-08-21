import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
const routes: Routes = [
    {
        path: 'admin',
        component: AdminLayoutComponent,
        // canActivate: [AuthGuardService],
        children: [
            {
                path: 'list-organisation',
                loadChildren: () =>
                    import('../../modules/organisations/organisations.module').then((c) => c.OrganisationsModule)
            },
            {
                path: 'list-company',
                loadChildren: () => import('../../modules/companies/companies.module').then((c) => c.CompaniesModule)
            },
            {
                path: 'list-subscription',
                loadChildren: () =>
                    import('../../modules/subscription/subscription.module').then((c) => c.SubscriptionModule)
            },
            {
                path: 'list-ged',
                loadChildren: () => import('../../modules/ged/ged.module').then((c) => c.GedModule)
            },
            {
                path: 'home',
                loadChildren: () => import('../../modules/home/home.module').then((c) => c.HomeModule)
            },
            {
                path: 'iot-devices',
                loadChildren: () =>
                    import('../../modules/iot-devices/iot-devices.module').then((c) => c.IotDevicesModule)
            },
            {
                path: 'list-users',
                loadChildren: () => import('../../modules/users/users.module').then((c) => c.UsersModule)
            },
            {
                path: 'packages',
                loadChildren: () => import('../../modules/packages/packages.module').then((c) => c.PackagesModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminLayoutRoutingModule {}
