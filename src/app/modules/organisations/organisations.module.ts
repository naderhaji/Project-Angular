import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganisationsComponent } from './organisations/organisations.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganisationsRoutingModule } from './organisations-routing.module';

@NgModule({
    declarations: [OrganisationsComponent],
    imports: [CommonModule, SharedModule, OrganisationsRoutingModule]
})
export class OrganisationsModule {}
