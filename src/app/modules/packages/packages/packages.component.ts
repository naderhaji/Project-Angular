import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IbuttonToggle } from 'src/app/core/models/button-toggle';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { ServiceFormPopupComponent } from '../service-list/service-form-popup/service-form-popup.component';
import { FeatureFormPopupComponent } from '../features-list/feature-form-popup/feature-form-popup.component';
import { ModulesFormPopupComponent } from '../modules-list/modules-form-popup/modules-form-popup.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-packages',
    templateUrl: './packages.component.html',
    styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
    selectedtoggle: string = 'Packages';
    toggleList: IbuttonToggle[] = [
        { name: 'Packages' },
        { name: 'Modules' },
        { name: 'Services' },
        { name: 'Features' }
    ];
    buttonLabel: string = 'Add package';
    afterAddFeature=false
    constructor(
        public navbar: NavbarService,
        public dialog: MatDialog,
        private router: Router,
        private actvatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.actvatedRoute.queryParams.subscribe((params) => {
            if (params['from']) {
                this.changetoggle(params['from']);
            }
        });
        this.navbar.setNavBar({
            breadcrumbTitle: 'Packages',
            breadcrumbIcon: 'packages'
        });
    }

    changetoggle(toggle: string) {
        this.selectedtoggle = toggle;
        switch (this.selectedtoggle) {
            case 'Services':
                this.buttonLabel = 'Add service';
                break;
            case 'Features':
                this.buttonLabel = 'Add feature';
                break;
            case 'Modules':
                this.buttonLabel = 'Add module';
                break;
            case 'Packages':
                this.buttonLabel = 'Add package';
                break;
        }
    }

    addElement() {
        switch (this.selectedtoggle) {
            case 'Services':
                this.addService();
                break;
            case 'Features':
                this.addFeature();
                break;
            case 'Modules':
                this.addModule();
                break;
            case 'Packages':
                this.addPackage();
                break;
        }
    }

    


    addService() {
        // this.dialog.open(ServiceFormPopupComponent, {
        //     data: {
        //         title: 'Add new service'
        //     }
        // });
        this.router.navigate(['/admin/packages/add-service'])
    }

    addFeature() {
      const refDialog =  this.dialog.open(FeatureFormPopupComponent, {
            width:'900px',
            data: {
                title: 'Add new feature'
            }
        });
        refDialog.afterClosed().subscribe((data)=>{
          this.afterAddFeature=true
        })
    }

    addModule() {
        // this.dialog.open(ModulesFormPopupComponent, {
        //     data: {
        //         title: 'Add new module'
        //     }
        // });
        this.router.navigate(['/admin/packages/add-module'])
    }

    addPackage() {
        this.router.navigate(['/admin/packages/add-package']);
    }
}
    
