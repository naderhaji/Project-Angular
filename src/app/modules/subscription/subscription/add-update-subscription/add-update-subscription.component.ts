import { Component } from '@angular/core';
import { IbuttonToggle } from 'src/app/core/models/button-toggle';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
    selector: 'app-add-update-subscription',
    templateUrl: './add-update-subscription.component.html',
    styleUrls: ['./add-update-subscription.component.scss']
})
export class AddUpdateSubscriptionComponent {
    currentStep: string = 'Company Details';
    toggleList: IbuttonToggle[] = [
        { name: 'Company Details' },
        { name: 'Offer Selection' },
        { name: 'Options' },
        { name: 'Summary' }
    ];
    selectedFontStyle: string = 'bold';
    constructor(public navbar: NavbarService) {}

    ngOnInit(): void {
        this.setNavbar();
    }

    setNavbar() {
        this.navbar.setNavBar({
            breadcrumbTitle: 'Add New Subscription',
            breadcrumbIcon: 'subscription'
        });
    }

    nextStep() {
        switch (this.currentStep) {
            case 'Company Details':
                this.currentStep = 'Offer Selection';
                break;
            case 'Offer Selection':
                this.currentStep = 'Options';
                break;
            case 'Options':
                this.currentStep = 'Summary';
                break;
        }
    }

    previousStep(){
      switch (this.currentStep) {
        case 'Offer Selection':
            this.currentStep = 'Company Details';
            break;
        case 'Options':
            this.currentStep = 'Offer Selection';
            break;
        case 'Summary':
            this.currentStep = 'Options';
            break;
    }
    }
}
