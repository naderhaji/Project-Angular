import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IButtonAction } from 'src/app/core/models/button-actions';
import { Icard } from 'src/app/core/models/card';
import { ICompany } from 'src/app/core/models/companys';
import { CompanysService } from 'src/app/services/companys/companys.service';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { DeletePopupComponent } from 'src/app/shared/delete-popup/delete-popup.component';

@Component({
    selector: 'app-list-company',
    templateUrl: './list-company.component.html',
    styleUrls: ['./list-company.component.scss']
})
export class ListCompanyComponent {
    showOverView = false;
    actionButtons: IButtonAction = {
        isDelete: true,
        isEdit: true,
        isAction1: true
    };
    companyOverview: ICompany;
    headers = {
        name: 'Company',
        countryCode: 'Country',
        city: 'City',
        street1: 'Address',
        email: 'Contact Mail',
        phoneNumber: 'Phone number',
        vatNumber: 'Vat Number'
    };
    companyList: ICompany[] = [];
    pageSize = 5;
    pageNumber = 1;
    totalLength: number = 0;
    Cards: Icard[] = [];
    constructor(
        public navbar: NavbarService,
        public dialog: MatDialog,
        private router: Router,
        private companyServ: CompanysService,
        private toastServ: ToasterService
    ) {}
    ngOnInit(): void {
        this.setNavbar();
        this.getAllCompany(this.pageNumber, this.pageSize);
        this.getCardData();
    }
    setNavbar() {
        this.navbar.setNavBar({
            breadcrumbTitle: 'Company',
            breadcrumbIcon: 'buildings'
        });
    }

    addUpdateCompany(company?: ICompany) {
        if (company)
            this.router.navigate(['admin/list-company/company-management'], {
                queryParams: {
                    id: company?.id
                }
            });
        else {
            this.router.navigate(['admin/list-company/company-management']);
        }
    }

    getAllCompany(pageNumber: number, pageSize: number, searchCriteria = '') {
        this.companyServ.getCompanys(pageNumber, pageSize, searchCriteria).subscribe((companys) => {
            this.companyList = companys.result.items;
            this.totalLength = companys.result.totalCount;
        });
    }
    onPageChange(event: any) {
        this.pageSize = event.pageSize;
        this.pageNumber = event.pageIndex + 1;
        this.getAllCompany(event.pageIndex + 1, event.pageSize);
    }
    searchCompany(termSearch: string) {
        this.getAllCompany(this.pageNumber, this.pageSize, termSearch);
    }
    deleteCompany(company: ICompany): void {
        const refDialog = this.dialog.open(DeletePopupComponent, {
            data: { module: 'delete' + ' ' + company.name + ' ' + 'company' }
        });
        refDialog.afterClosed().subscribe((confirm) => {
            if (company.id && confirm)
                this.companyServ.deleteCompany(company.id).subscribe(
                    () => {
                        this.toastServ.successToast('Company is successfully deleted');
                        this.getAllCompany(this.pageNumber, this.pageSize);
                        this.getCardData();
                    },
                    (error) => this.toastServ.errorToast(error.error[0].errorMessage)
                );
        });
    }

    overviewCompany(company: ICompany) {
        this.companyOverview = company;
        this.showOverView = true;
    }

    closeOverView() {
        this.showOverView = false;
    }

    getCardData(){
      this.companyServ.getTotalNumberCompany().subscribe((data:any)=>{
        this.Cards=this.Cards = [
          {
              description: 'Total Companies',
              icon: 'assets/icon/sidebarIcon/Buildings.svg',
              num_stat: data.data.totalCompany
          }
      ];
      })
    }
}
