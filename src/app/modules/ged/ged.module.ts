import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GedRoutingModule } from './ged-routing.module';
import { GedComponent } from './ged/ged.component';


@NgModule({
  declarations: [
    GedComponent
  ],
  imports: [
    CommonModule,
    GedRoutingModule
  ]
})
export class GedModule { }
