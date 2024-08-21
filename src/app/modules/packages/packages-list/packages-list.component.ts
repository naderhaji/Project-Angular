import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IButtonAction } from 'src/app/core/models/button-actions';
import { Ipackage } from 'src/app/core/models/package';
import { PackageService } from 'src/app/services/packages/package/package.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { DeletePopupComponent } from 'src/app/shared/delete-popup/delete-popup.component';

@Component({
    selector: 'app-packages-list',
    templateUrl: './packages-list.component.html',
    styleUrls: ['./packages-list.component.scss']
})
export class PackagesListComponent {
    actionButtons: IButtonAction = {
        isDelete: true,
        isEdit: true,
        isLockKey: true,
        isReadOnly:true

    };
    pageSize = 5;
    pageNumber = 1;
    totalLength: number = 0;
    packageList: Ipackage[] = [];
    headers = {
        name: 'Package Name',
        services: 'Services',
        modules: 'Modules',
        validity: 'Validity'
    };
    constructor(public dialog: MatDialog, private router: Router, private packageServ: PackageService, private toastServ: ToasterService) 
    {}

    ngOnInit(): void {
        this.getAllPackages(this.pageNumber, this.pageSize);
    }

    getAllPackages(pageNumber: number, pageSize: number, searchCriteria = '') {
        this.packageServ.getAllPackages(pageNumber, pageSize, searchCriteria).subscribe((data: any) => {
            let pack: Ipackage;
            this.packageList = [];
            for (let element of data.result.items) {
                pack = {
                    id: element.id,
                    name: element.name,
                    code: element.code,
                    description: element.description,
                    services: element.services.map((service: any) => service.name).join(', '),
                    modules: element.modules.map((module: any) => module.name).join(', '),
                    validFrom: element.validFrom,
                    validUntil: element.validUntil,
                    validity: element.validity,
                    licenceNumber: element.licenceNumber,
                    isEnabled: element.isEnabled
                };
                this.packageList.push(pack);
            }
            this.totalLength = data.result.totalCount;
        });
    }


    onPageChange(event: any) {
        this.pageSize = event.pageSize;
        this.pageNumber = event.pageIndex + 1;
        this.getAllPackages(event.pageIndex + 1, event.pageSize);
    }

    searchPackage(searchCriteria: string) {
        this.getAllPackages(this.pageNumber, this.pageSize, searchCriteria);
    }

    deletePackage(pack: Ipackage) {
        const refDialog = this.dialog.open(DeletePopupComponent, {
            data: { module: 'delete' + ' ' + pack.name + ' ' + 'package' }
        });
        refDialog.afterClosed().subscribe((confirm) => {
            if (pack.id && confirm)
                this.packageServ.deletePackage(pack.id).subscribe(() => {
                    this.toastServ.successToast('Package is successfully deleted');
                    this.getAllPackages(this.pageNumber, this.pageSize);
                },
                (error)=>
                this.toastServ.errorToast(error.error[0].errorMessage)
                );
        });
    }

    editPackage(pack: Ipackage) {
        this.router.navigate(['/admin/packages/add-package'], { queryParams: 
            { 
                id: pack.id 
            } }
        );
    }

     setStatusPackage(pack: Ipackage) {
         const refDialog = this.dialog.open(DeletePopupComponent, {
             data: { module: 'set status' + ' ' + pack.name + ' ' + 'package' }
         });
         refDialog.afterClosed().subscribe((confirm) => {
             if (pack.id && confirm)
                 this.packageServ.setStatus(pack.id).subscribe(() => {
                     this.toastServ.successToast('Package status is successfully changed');
                     this.getAllPackages(this.pageNumber, this.pageSize, '');
                 },
                (error)=>
                this.toastServ.errorToast(error.error[0].errorMessage)
                );
         });
     }

     readOnly(pack: Ipackage){
        this.router.navigate(['/admin/packages/add-package'], {
          queryParams: {
              id: pack.id,
              action:'readOnly'
          }
      });
      }
    
}
