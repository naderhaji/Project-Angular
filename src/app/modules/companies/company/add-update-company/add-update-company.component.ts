import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanysService } from 'src/app/services/companys/companys.service';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';

@Component({
    selector: 'app-add-update-company',
    templateUrl: './add-update-company.component.html',
    styleUrls: ['./add-update-company.component.scss']
})
export class AddUpdateCompanyComponent {
    formCompany!: FormGroup;
    submitted = false;
    countries = [
        { name: 'France', cities: ['Paris', 'Marseille', 'Lyon'] },
        { name: 'Allemagne', cities: ['Berlin', 'Munich', 'Hambourg'] },
        { name: 'Tunisie', cities: ['Tunis', 'Sfax', 'Sousse'] }
    ];
    cities: string[] = [];
    selectedFile: any = null;
    companyId: any;
    constructor(
        public navbar: NavbarService,
        private companyServ: CompanysService,
        private toastServ: ToasterService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.setNavbar();
    }

    ngOnInit(): void {
        this.companyId = this.activatedRoute.snapshot.queryParamMap.get('id');
        this.initiateFormCompany();
    }

    initiateFormCompany() {
        this.formCompany = new FormGroup({
            registrationId: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            notes: new FormControl('', [Validators.required]),
            street1: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            countryCode: new FormControl('', [Validators.required]),
            phoneNumber: new FormControl('', [Validators.required]),
            vatNumber: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email])
            // documents : new FormControl(''),
        });
        if (this.companyId) {
            this.companyServ.getCompanyById(this.companyId).subscribe((company: any) => {
                this.formCompany.patchValue(company.result);
            });
        }
    }
    setNavbar() {
        this.navbar.setNavBar({
            breadcrumbTitle: 'Add New Company',
            breadcrumbIcon: 'buildings'
        });
    }
    getCitiesByCountry(countryname: string): string[] {
        const country = this.countries.find((c: any) => c.name === countryname);
        return country ? country.cities : [];
    }
    addCompany() {
        this.companyServ.addCompany(this.formCompany.value).subscribe(
            () => {
                this.toastServ.successToast('Company is successfully created');
                setTimeout(() => {
                    this.router.navigate(['admin/list-company']);
                },);
            },
            (error) => this.toastServ.errorToast(error.error[0].errorMessage)
        );
    }

    updateCompany() {
        this.companyServ.updateCompany({ id: this.companyId, ...this.formCompany.value }).subscribe(
            () => {
                this.toastServ.successToast('Company is successfully updated');
                setTimeout(() => {
                    this.router.navigate(['admin/list-company']);
                },);
            },
            (error) => this.toastServ.errorToast(error.error[0].errorMessage)
        );
    }

    actionToCall() {
        this.submitted = true;
        Object.keys(this.formCompany.controls).forEach((key) => {
            this.formCompany.get(key)?.markAsTouched();
        });
        if (this.formCompany.invalid) {
            return;
        }
        if (this.companyId) {
            this.updateCompany();
        } else {
            this.addCompany();
        }
    }
    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0] ?? null;
    }
}
