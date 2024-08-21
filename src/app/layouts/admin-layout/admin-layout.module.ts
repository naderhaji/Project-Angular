import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { SidebarComponent } from '../../core/sidebar/sidebar.component';
import { NavbarComponent } from '../../core/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [AdminLayoutComponent, SidebarComponent, NavbarComponent],
    imports: [CommonModule,
      AdminLayoutRoutingModule,
      MatToolbarModule,
      MatFormFieldModule,
      MatSelectModule,
      MatBadgeModule,
      MatMenuModule,
      MatButtonModule,
      MatIconModule,
      SharedModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminLayoutModule {}
