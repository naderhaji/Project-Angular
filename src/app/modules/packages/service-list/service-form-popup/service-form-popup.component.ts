import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { ICategory } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { ServiceService } from 'src/app/services/packages/service/service.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { PricingFormComponent } from '../../pricing-form/pricing-form.component';
import { IPrice, IService } from 'src/app/core/models/service';

@Component({
    selector: 'app-service-form-popup',
    templateUrl: './service-form-popup.component.html',
    styleUrls: ['./service-form-popup.component.scss']
})
export class ServiceFormPopupComponent implements OnInit {
    @ViewChild(PricingFormComponent) PricingFormComponent!: PricingFormComponent;
    formServices!: FormGroup;
    idService: any;
    pricing: IPrice[] = [];
    listPricing: IPrice[] = [];
    listCategory: ICategory[];
    submitted = false;
    readOnly: any;
    constructor(
        public navbar: NavbarService,
        private activatedRoute: ActivatedRoute,
        private _categoryServ: CategoryService,
        private _serviceServ: ServiceService,
        private _toasterServ: ToasterService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.idService = this.activatedRoute.snapshot.queryParamMap.get('id');
        this.readOnly = this.activatedRoute.snapshot.queryParamMap.get('action');
        this.setNavBar();
        this.getAllCategory();
        this.initiateformServices();

        // if (this.data.service) this.form.patchValue(this.data.service);
    }

    setNavBar() {
        this.navbar.setNavBar({
            breadcrumbTitle: this.idService ? 'Update service' : 'Add new service',
            breadcrumbIcon: 'packages'
        });
    }

    initiateformServices() {
        this.formServices = new FormGroup({
            categoryId: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            code: new FormControl('', [Validators.required]),
            quantity: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required])
        });
        if (this.idService) {
            this._serviceServ.getServiceById(this.idService).subscribe((service: any) => {
                // To initiate the left formGroup
                this.formServices.patchValue({ ...service.result, categoryId: service.result.category.id });
                // To initiate the list of pricing
                this.listPricing = service.result.servicePricing;
                this.pricing = service.result.servicePricing;
            });
        }
        if (this.readOnly) {
            this.formServices.disable();
        }
    }
    getAllCategory() {
        this._categoryServ.getAllCategory().subscribe((data) => {
            this.listCategory = data.result;
        });
    }

    // Get the list of pricing and and prepares it for payload
    getPricingService(price: IPrice[]) {
        let priceFinal: IPrice[] = [];
        price.forEach((element: IPrice) => {
            let result: IPrice = { ...element, sectors: element.sectors.map((sector: any) => sector.id) };
            priceFinal.push(result);
        });
        this.pricing = priceFinal;
    }

    // Add Service
    addService() {
        let service = { ...this.formServices.value, servicePricings: this.pricing };
        this._serviceServ.addService(service).subscribe(
            () => {
                this._toasterServ.successToast('Service is successfully created');
            },
            (error) => this._toasterServ.errorToast(error.error[0].errorMessage)
        );
    }

    // Update service
    updateService() {
        if (this.pricing[0]?.sectors[0]?.code) {
            this.getPricingService(this.pricing);
        }
        let service = { id: this.idService, ...this.formServices.value, servicePricings: this.pricing };
        this._serviceServ.updateService(service).subscribe(
            () => {
                this._toasterServ.successToast('Service is successfully updated');
            },
            (error) => this._toasterServ.errorToast(error.error[0].errorMessage)
        );
    }

    actionToCall() {
        this.submitted = true;
        if (this.formServices.value && this.pricing.length == 0) {
            return;
        }
        if (this.idService) {
            this.updateService();
        } else {
            this.addService();
        }
        this.router.navigate(['/admin/packages'], { queryParams: { from: 'Services' } });
    }

    cancel() {
        this.router.navigate(['/admin/packages'], { queryParams: { from: 'Services' } });
    }
}
