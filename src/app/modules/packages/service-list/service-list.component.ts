import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IButtonAction } from 'src/app/core/models/button-actions';
import { ServiceFormPopupComponent } from './service-form-popup/service-form-popup.component';
import { Router } from '@angular/router';
import { IService } from 'src/app/core/models/service';
import { ServiceService } from 'src/app/services/packages/service/service.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { DeletePopupComponent } from 'src/app/shared/delete-popup/delete-popup.component';

@Component({
    selector: 'app-service-list',
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent {
    actionButtons: IButtonAction = {
        isDelete: true,
        isEdit: true,
        isLockKey: true,
        isReadOnly:true
    };
    headers = {
        category: 'Category',
        name: 'Name',
        description: 'Description',
        quantity: 'Quantity'
    };
    pageSize = 5;
    pageNumber = 1;
    serviceList: IService[] = [];
    totalLength: number = 0;
    constructor(
        private router: Router,
        private _serviceServ: ServiceService,
        private _toastServ: ToasterService,
        public dialog: MatDialog,
    ) {}
    ngOnInit(): void {
        this.getAllServices(this.pageNumber, this.pageSize);
    }

    /** Get all services */
    getAllServices(pageNumber: number, pageSize: number, searchCriteria = '') {
        this._serviceServ.getAllServices(pageNumber, pageSize, searchCriteria).subscribe((data: any) => {
            this.serviceList = data.result.items.reverse();
            this.totalLength = data.result.totalCount;
        });
    }

    /** Pagination */
    onPageChange(event: any) {
      this.pageSize = event.pageSize;
      this.pageNumber = event.pageIndex + 1;
      this.getAllServices(event.pageIndex + 1, event.pageSize);
    }

    /** Search */
    searchService(termSearch: string) {
      this.getAllServices(this.pageNumber, this.pageSize, termSearch);
    }
    /** Delete service */
    deleteService(service: IService): void {
      const refDialog = this.dialog.open(DeletePopupComponent, {
          data: { module: 'delete' + ' ' + service.name + ' ' + 'service' }
      });
      refDialog.afterClosed().subscribe((confirm) => {
          if (service.id && confirm)
              this._serviceServ.deleteService(service.id).subscribe(
                  () => {
                      this._toastServ.successToast('Service is successfully deleted');
                      this.getAllServices(this.pageNumber, this.pageSize);
                  },
                  (error) => this._toastServ.errorToast(error.error[0].errorMessage)
              );
      });
  }
   /** Set status service */
  setStatusService(service: IService) {
    const refDialog = this.dialog.open(DeletePopupComponent, {
        data: { module: 'set status' + ' ' + service.name + ' ' + 'service' }
    });
    refDialog.afterClosed().subscribe((confirm) => {
        if (service.id && confirm)
            this._serviceServ.setStatus(service.id).subscribe(() => {
                this._toastServ.successToast('Service status is successfully changed');
                this.getAllServices(this.pageNumber, this.pageSize);
            },
            (error)=>
            this._toastServ.errorToast(error.error[0].errorMessage)
            );
    });
}
    editService(service: IService) {
      this.router.navigate(['admin/packages/add-service'], {
          queryParams: {
              id: service.id
          }
      });
  }

  readOnly(service: IService){
    this.router.navigate(['admin/packages/add-service'], {
      queryParams: {
          id: service.id,
          action:'readOnly'
      }
  });
  }
}
