import { Component, Input, SimpleChanges } from '@angular/core';
import { IButtonAction } from 'src/app/core/models/button-actions';
import { FeatureFormPopupComponent } from './feature-form-popup/feature-form-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { FeatureService } from 'src/app/services/packages/feature/feature.service';
import { IFeature } from 'src/app/core/models/feature';
import { DeletePopupComponent } from 'src/app/shared/delete-popup/delete-popup.component';
import { ToasterService } from 'src/app/services/toaster/toaster.service';

@Component({
    selector: 'app-features-list',
    templateUrl: './features-list.component.html',
    styleUrls: ['./features-list.component.scss']
})
export class FeaturesListComponent {
    actionButtons: IButtonAction = {
        isDelete: true,
        isEdit: true,
        isLockKey: true
    };
    headers = {
        code: 'Code',
        name: 'Name',
        description: 'Description'
    };
    pageSize = 5;
    pageNumber = 1;
    totalLength: number = 0;
    featureList: IFeature[] = [];
    @Input() afterAddFeature = false;
    constructor(
        public dialog: MatDialog,
        private featureServ: FeatureService,
        private toastServ: ToasterService
    ) {}

    ngOnInit(): void {
        this.getAllFeatures(this.pageNumber, this.pageSize);
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (this.afterAddFeature) {
            this.getAllFeatures(this.pageNumber, this.pageSize);
        }
    }
    editFeature(data: any) {
        const dialogRef = this.dialog.open(FeatureFormPopupComponent, {
            width: '900px',
            data: { title: 'Update feature', feature: data }
        });
        dialogRef.afterClosed().subscribe(() => {
            this.getAllFeatures(this.pageNumber, this.pageSize);
        });
    }

    getAllFeatures(pageNumber: number, pageSize: number, searchCriteria = '') {
        this.featureServ.getAllFeatures(pageNumber, pageSize, searchCriteria).subscribe((data: any) => {
            this.featureList = data.result.items.reverse();
            this.totalLength = data.result.totalCount;
        });
    }

    onPageChange(event: any) {
        this.pageSize = event.pageSize;
        this.pageNumber = event.pageIndex + 1;
        this.getAllFeatures(event.pageIndex + 1, event.pageSize);
    }

    deleteFeature(feature: IFeature) {
        const refDialog = this.dialog.open(DeletePopupComponent, {
            data: { module: 'delete' + ' ' + feature.name + ' ' + 'feature' }
        });
        refDialog.afterClosed().subscribe((confirm) => {
            if (feature.id && confirm)
                this.featureServ.deleteFeature(feature.id).subscribe(() => {
                    this.toastServ.successToast('Feature is successfully deleted');
                    this.getAllFeatures(this.pageNumber, this.pageSize);
                },
                (error)=>
                this.toastServ.errorToast(error.error[0].errorMessage)
                );
        });
    }

    searchFeature(termSearch: string) {
        this.getAllFeatures(this.pageNumber, this.pageSize, termSearch);
    }

    setStatusFeature(feature: IFeature) {
        const refDialog = this.dialog.open(DeletePopupComponent, {
            data: { module: 'set status' + ' ' + feature.name + ' ' + 'feature' }
        });
        refDialog.afterClosed().subscribe((confirm) => {
            if (feature.id && confirm)
                this.featureServ.setStatus(feature.id).subscribe(() => {
                    this.toastServ.successToast('Feature status is successfully changed');
                    this.getAllFeatures(this.pageNumber, this.pageSize);
                },
                (error)=>
                this.toastServ.errorToast(error.error[0].errorMessage)
                );
        });
    }
}
