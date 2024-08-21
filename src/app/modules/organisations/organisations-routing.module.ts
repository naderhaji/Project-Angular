import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationsComponent } from './organisations/organisations.component';
import { OrganisationsService } from 'src/app/services/organisations/organisations.service';

const routes: Routes = [
  {
    path: '',
    component: OrganisationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[OrganisationsService]
})
export class OrganisationsRoutingModule { }
