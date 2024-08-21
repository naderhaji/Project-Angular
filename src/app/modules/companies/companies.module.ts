import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './companies-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyComponent } from './company/company.component';
import { AddUpdateCompanyComponent } from './company/add-update-company/add-update-company.component';
import { ListCompanyComponent } from './company/list-company/list-company.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OverviewComponent } from './company/overview/overview.component';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
    declarations: [
      CompanyComponent,
      AddUpdateCompanyComponent,
      ListCompanyComponent,
      OverviewComponent],
    imports: [
        CommonModule,
        CompanyRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        TextFieldModule
    ]
})
export class CompaniesModule {}
