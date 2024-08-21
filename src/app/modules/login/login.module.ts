import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [LoginComponent],
    imports: [
         CommonModule,
         LoginRoutingModule,
         MatIconModule,
         MatButtonModule,
         MatSelectModule,
         MatNativeDateModule,
         MatDatepickerModule,
         FormsModule,
         MatFormFieldModule,
         MatInputModule,
         ReactiveFormsModule,

        ]
})
export class LoginModule {}
