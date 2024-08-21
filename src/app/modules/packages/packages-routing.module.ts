import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackagesComponent } from './packages/packages.component';
import { PackageFormComponent } from './packages-list/package-form/package-form.component';
import { ModulesFormPopupComponent } from './modules-list/modules-form-popup/modules-form-popup.component';
import { ServiceFormPopupComponent } from './service-list/service-form-popup/service-form-popup.component';

const routes: Routes = [
    {
        path: '',
        component: PackagesComponent
    },
    {
        path: 'add-package',
        component: PackageFormComponent
    },
    {
      path:'add-module',
      component: ModulesFormPopupComponent
    },
    {
      path:'add-service',
      component: ServiceFormPopupComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class PackagesRoutingModule {}
