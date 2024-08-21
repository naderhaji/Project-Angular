import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ExportAsModule } from 'ngx-export-as';
import { CardComponent } from './card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ButtonTogglesComponent } from './button-toggles/button-toggles.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
        TableComponent,
        BreadcrumbComponent,
        CardComponent,
        ButtonTogglesComponent,
        HeaderComponent,
        DeletePopupComponent,
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSortModule,
        MatButtonModule,
        ExportAsModule,
        MatIconModule,
        MatDividerModule,
        MatButtonToggleModule,
        RouterModule,
        MatSelectModule,
        MatRadioModule,
        MatOptionModule,
        MatDialogModule
    ],
    exports: [
        TableComponent,
        BreadcrumbComponent,
        CardComponent,
        ButtonTogglesComponent,
        HeaderComponent,
        DeletePopupComponent,
    ]
})
export class SharedModule {}
