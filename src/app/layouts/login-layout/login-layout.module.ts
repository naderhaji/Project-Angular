import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { LoginLayoutRoutingModule } from './login-layout-routing.module';

@NgModule({
    declarations: [LoginLayoutComponent],
    imports: [CommonModule, LoginLayoutRoutingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginLayoutModule {}
