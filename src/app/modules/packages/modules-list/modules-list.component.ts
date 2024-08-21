import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IButtonAction } from 'src/app/core/models/button-actions';
import { ModulesFormPopupComponent } from './modules-form-popup/modules-form-popup.component';
import { Router } from '@angular/router';
import { Imodule } from 'src/app/core/models/module';
import { ModuleService } from 'src/app/services/packages/module/module.service';
import { DeletePopupComponent } from 'src/app/shared/delete-popup/delete-popup.component';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { IFeature } from 'src/app/core/models/feature';
import { data } from 'cypress/types/jquery';

@Component({
    selector: 'app-modules-list',
    templateUrl: './modules-list.component.html',
    styleUrls: ['./modules-list.component.scss']
})
export class ModulesListComponent {
    headers = {
        code: 'Code',
        name: 'Name',
        features: 'Features',
        moduleTypeId: 'Types',
        description: 'Description',
        
    };
    pageSize = 5;
    pageNumber = 1;
    totalLength: number = 0;
    modulesList: Imodule[] = [];
    actionButtons: IButtonAction = {
        isDelete: true,
        isEdit: true,
        isLockKey: true,
        isReadOnly:true
    };

    constructor(public dialog: MatDialog, private router: Router, private moduleserv: ModuleService, private toastServ: ToasterService) {}

    ngOnInit(): void {
        this.getAllModule(this.pageNumber, this.pageSize);
    }
    

    //get all modules
     getAllModule(pageNumber: number, pageSize: number, searchCriteria = '') {
         this.moduleserv.getAllModules(pageNumber, pageSize, searchCriteria).subscribe((data: any) => {
             let module: Imodule;
             this.modulesList = [];
             for (let element of data.result.items) {
                 module = {
                     id: element.id,
                     code: element.code,
                     name: element.name,
                     description: element.description,
                     features: element.features.map((feature: any) => feature.name).join(', '),
                     moduleTypeId: element.moduleType.name,
                     isEnabled: element.isEnabled
                 };
                 this.modulesList.push(module);
             }
             this.totalLength = data.result.totalCount;
         });
     }


    onPageChange(event: any) {
        this.pageSize = event.pageSize;
        this.pageNumber = event.pageIndex + 1;
        this.getAllModule(event.pageIndex + 1, event.pageSize);
    }

    searchModules(termSearch: string) {
        this.getAllModule(this.pageNumber, this.pageSize, termSearch);
    }

    deleteModule(module: Imodule) {
        const refDialog = this.dialog.open(DeletePopupComponent, {
            data: { module: 'delete' + ' ' + module.name + ' ' + 'module' }
        });
        refDialog.afterClosed().subscribe((confirm) => {
            if (module.id && confirm)
                this.moduleserv.deleteModule(module.id).subscribe(() => {
                    this.toastServ.successToast('Module is successfully deleted');
                    this.getAllModule(this.pageNumber, this.pageSize);
                },
                (error)=>
                this.toastServ.errorToast(error.error[0].errorMessage)
                );
        });
    }


    setStatusModule(module: Imodule) {
        const refDialog = this.dialog.open(DeletePopupComponent, {
            data: { module: 'set status' + ' ' + module.name + ' ' + 'module' }
        });
        refDialog.afterClosed().subscribe((confirm) => {
            if (module.id && confirm)
                this.moduleserv.setStatus(module.id).subscribe(() => {
                    this.toastServ.successToast('Module status is successfully changed');
                    this.getAllModule(this.pageNumber, this.pageSize, '');
                },
                (error)=>
                this.toastServ.errorToast(error.error[0].errorMessage)
                );
        });
    }


    editModule(module: Imodule) {
        this.router.navigate(['/admin/packages/add-module'], {queryParams :
            {
              id : module.id
            }});
    }

    readOnly(module: Imodule){
        this.router.navigate(['admin/packages/add-module'], {
          queryParams: {
              id: module.id,
              action:'readOnly'
          }
      });
      }


}
