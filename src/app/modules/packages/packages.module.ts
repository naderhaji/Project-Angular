import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesRoutingModule } from './packages-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PackagesComponent } from './packages/packages.component';
import { PackagesListComponent } from './packages-list/packages-list.component';
import { ModulesListComponent } from './modules-list/modules-list.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { FeaturesListComponent } from './features-list/features-list.component';
import { ServiceFormPopupComponent } from './service-list/service-form-popup/service-form-popup.component';
import { MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FeatureFormPopupComponent } from './features-list/feature-form-popup/feature-form-popup.component';
import { ModulesFormPopupComponent } from './modules-list/modules-form-popup/modules-form-popup.component';
import { PackageFormComponent } from './packages-list/package-form/package-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { PricingFormComponent } from './pricing-form/pricing-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {CdkTableModule} from '@angular/cdk/table';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    declarations: [
        PackagesComponent,
        PackagesListComponent,
        ModulesListComponent,
        ServiceListComponent,
        FeaturesListComponent,
        ServiceFormPopupComponent,
        FeatureFormPopupComponent,
        ModulesFormPopupComponent,
        PackageFormComponent,
        PricingFormComponent

    ],
    imports: [
        CommonModule,
        PackagesRoutingModule,
        SharedModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
        MatInputModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatRadioModule,
        MatTableModule,
        MatSortModule,
        CdkTableModule,
        TextFieldModule,
        MatCheckboxModule
    ]
})
export class PackagesModule {}
