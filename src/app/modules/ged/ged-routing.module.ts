import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GedComponent } from './ged/ged.component';

const routes: Routes = [{
  path:'',
  component:GedComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GedRoutingModule { }
