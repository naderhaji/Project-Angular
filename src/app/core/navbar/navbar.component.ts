import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { INavPrameters } from '../models/navbar';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    selectedLanguage: string = 'Eng (US)';
    notificationCount = 5;

    params!: INavPrameters;
    name!: unknown;
    constructor(public navbar: NavbarService) {}

    ngOnInit(): void {
        this.navbar.currentPrameters.subscribe((res: INavPrameters) => {
            this.params = res;
        });
    }
    handleNotificationClick() {
        console.log('Notification');
    }
    userName = 'John Doe';
    roleUser = 'Super Admin';
    isMenuOpen = false;

    menuOpen() {
        this.isMenuOpen = true;
    }

    menuClose() {
        this.isMenuOpen = false;
    }
}
