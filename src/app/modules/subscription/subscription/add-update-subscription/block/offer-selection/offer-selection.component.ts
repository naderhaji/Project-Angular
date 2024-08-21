import { Component } from '@angular/core';

@Component({
    selector: 'app-offer-selection',
    templateUrl: './offer-selection.component.html',
    styleUrls: ['./offer-selection.component.scss']
})
export class OfferSelectionComponent {
    tableData: any = [
        {
            module: 'Freight Navigator',
            starter: 'Transport Unit Management',
            pro: 'Transport Unit Management',
            premium: 'Transport Unit Management'
        },
        {
            module: 'Freight Tracking',
            starter: '-',
            pro: 'Real-Time Tracking of Transport Unit',
            premium: 'Real-Time Tracking of Transport Unit'
        },
        {
            module: 'Freight Plan',
            starter: 'Transport Order Management Basic Planning Center',
            pro: 'Transport Order Management Basic Planning Center',
            premium: 'Transport Order Management Basic Planning Center'
        },
        {
            module: 'Freight Mobile',
            starter: '-',
            pro: 'Delivery Management Time Management',
            premium: 'Delivery Management Time Management'
        },
        {
          module: '',
          starter: '50',
          pro: '70',
          premium: '80'
      }
    ];
    xSelected:number;
    ySelected:number;
    header = ['Modules', 'Gamme starter', 'Gamme Pro', 'Gamme Premium'];
    rowsContent = ['module', 'starter', 'pro', 'premium'];

    select(i:number , j:number){
      this.xSelected = i;
      this.ySelected = j;
      console.log('seleced',this.xSelected,this.ySelected)
    }
}
