import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

    loginForm!: FormGroup;

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }
}
