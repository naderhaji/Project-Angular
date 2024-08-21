import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  selectedLanguage: string = 'Eng (US)';
  hide1: boolean = true;
  togglePasswordVisibility() {
    this.hide1 = !this.hide1;
   // this.passwordVisibilityClicked = !this.passwordVisibilityClicked;
  }
}
