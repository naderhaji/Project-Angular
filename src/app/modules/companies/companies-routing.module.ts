import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { AddUpdateCompanyComponent } from './company/add-update-company/add-update-company.component';
import { ListCompanyComponent } from './company/list-company/list-company.component';

const routes: Routes = [{
  path:'',
  component: CompanyComponent,
  children:[
    {
      path:'',
      component: ListCompanyComponent
    },
    {
      path:'company-management',
      component: AddUpdateCompanyComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
