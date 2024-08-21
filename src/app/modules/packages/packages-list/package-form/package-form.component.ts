import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Imodule } from 'src/app/core/models/module';
import { IPrice, IService } from 'src/app/core/models/service';
import { init } from 'src/app/services/configuration/config.service';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { ModuleService } from 'src/app/services/packages/module/module.service';
import { PackageService } from 'src/app/services/packages/package/package.service';
import { ServiceService } from 'src/app/services/packages/service/service.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { DeletePopupComponent } from 'src/app/shared/delete-popup/delete-popup.component';

@Component({
    selector: 'app-package-form',
    templateUrl: './package-form.component.html',
    styleUrls: ['./package-form.component.scss']
})
export class PackageFormComponent {
    formPackage!: FormGroup;
    idPackage: any;
    pricing: IPrice[] = [];
    modules: Imodule[] = [];
    services: IService[] = [];
    listPricing: IPrice[] = [];
    submitted = false;
    readOnly :any;
    constructor(public navbar: NavbarService, private activatedRoute: ActivatedRoute, private packageServ: PackageService, private moduleServ: ModuleService, private serviceServ: ServiceService, private toastServ: ToasterService, private router: Router) {
        this.initiateformPackage();
    }

    ngOnInit(): void {
        this.idPackage = this.activatedRoute.snapshot.queryParamMap.get('id');
        this.readOnly = this.activatedRoute.snapshot.queryParamMap.get('action');
        this.navbar.setNavBar({
            breadcrumbTitle: this.idPackage ? 'Update package' : 'Add new package',
            breadcrumbIcon: 'packages'
        });
        this.getallModules();
        this.getallServices();
        this.initiateformPackage();
    }

    initiateformPackage() {
        this.formPackage = new FormGroup({
            code: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            validFrom: new FormControl('', [Validators.required]),
            validUntil: new FormControl('', [Validators.required]),
            validity: new FormControl('', [Validators.required]),
            modules: new FormControl('', [Validators.required]),
            services: new FormControl('', [Validators.required])
        });
        if (this.idPackage) {
            this.packageServ.getPackageById(this.idPackage).subscribe((pack: any) => {
                // To initiate the left formGroup 
                this.formPackage.patchValue({ ...pack.result, modules: pack.result.modules.map((module: Imodule) => module.id), services: pack.result.services.map((service: IService) => service.id) });
                this.getPricingModule(pack.result.packagePricings);
                // To initiate the right formGroup
                this.listPricing = pack.result.packagePricings;
                this.pricing = pack.result.packagePricings;
            });
        }
        if(this.readOnly){
            this.formPackage.disable();
        }
    }


    getallModules() {
        this.moduleServ.getallModules().subscribe((data: any) => {
            this.modules = data.result.items;
        });
    }

    getallServices() {
        this.serviceServ.getallServices().subscribe((data: any) => {
            this.services = data.result.items;
        });
    }

    getPricingModule(price: IPrice[]) {
        let priceFinal: IPrice[] = []
        price.forEach((element: IPrice) => {
            let result: IPrice = { ...element, sectors: element.sectors.map((sector: any) => sector.id) }
            priceFinal.push(result)
        });
        this.pricing = priceFinal
    }


    addPackage() {
        this.submitted = true;
        if (this.formPackage.value && this.pricing.length == 0) {
            return
        }
        let pack = { id: this.idPackage, ...this.formPackage.value, packagePricings: this.pricing }
        this.packageServ.addPackage(pack).subscribe(() => {
            this.toastServ.successToast('Package is successfully added');
        },
            (error) => this.toastServ.errorToast(error.error[0].errorMessage))

    }

    updatePackage() {
        let pack = { id: this.idPackage, ...this.formPackage.value, packagePricings: this.pricing }
        this.packageServ.updatePackage(pack).subscribe(() => {
            this.toastServ.successToast('Package is successfully updated');
        },
            (error) => this.toastServ.errorToast(error.error[0].errorMessage))

    }


    actionToCall() {
        this.submitted = true;
        if (this.formPackage.value && this.pricing.length == 0) {
            return
        }
        if (!this.formPackage.value.modules || this.formPackage.value.modules.length === 0 &&
            !this.formPackage.value.services || this.formPackage.value.services.length === 0) {
            console.error('Veuillez sélectionner au moins un module et un service.');
            return;
        }
        let pack = { id: this.idPackage, ...this.formPackage.value, packagePricings: this.pricing };
        if (this.idPackage) {
            this.updatePackage();
        } else {
            this.addPackage();
        }
        this.router.navigate(['/admin/packages']);
    }
    cancel() {
        this.router.navigate(['/admin/packages']);
    }














}
