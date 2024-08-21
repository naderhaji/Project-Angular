import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListSubscriptionComponent } from './subscription/list-subscription/list-subscription.component';
import { OverviewComponent } from './subscription/overview/overview.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddUpdateSubscriptionComponent } from './subscription/add-update-subscription/add-update-subscription.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CompanyDetailsComponent } from './subscription/add-update-subscription/block/company-details/company-details.component';
import { OfferSelectionComponent } from './subscription/add-update-subscription/block/offer-selection/offer-selection.component';
import { OptionsComponent } from './subscription/add-update-subscription/block/options/options.component';
import { SummaryComponent } from './subscription/add-update-subscription/block/summary/summary.component';



@NgModule({
  declarations: [
    SubscriptionComponent,
    ListSubscriptionComponent,
    AddUpdateSubscriptionComponent,
    OverviewComponent,
    CompanyDetailsComponent,
    OfferSelectionComponent,
    OptionsComponent,
    SummaryComponent

  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    SharedModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatButtonToggleModule
  ]
})
export class SubscriptionModule { }
