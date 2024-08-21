import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IButtonAction } from 'src/app/core/models/button-actions';
import { Icard } from 'src/app/core/models/card';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { DeletePopupComponent } from 'src/app/shared/delete-popup/delete-popup.component';

@Component({
    selector: 'app-list-subscription',
    templateUrl: './list-subscription.component.html',
    styleUrls: ['./list-subscription.component.scss']
})
export class ListSubscriptionComponent implements OnInit {
    showOverView = false;
    showFiltre: boolean = true;
    listoptioncountryMapped: any = [];
    listoptionlicensestatus: string[] = ['Active', 'Expired'];
    listoptioncountry: string[] = ['United States', 'France', 'Germany', ''];

    constructor(
        public navbar: NavbarService,
        public dialog: MatDialog,
        private router: Router
    ) {
        this.setNavbar();
    }
    ngOnInit(): void {
        this.listoptioncountryMapped = this.allData.map((item) => ({ id: item.Company, name: item.Country }));
        console.log(this.listoptioncountryMapped);
    }
    setNavbar() {
        this.navbar.setNavBar({
            breadcrumbTitle: 'Subscriptions',
            breadcrumbIcon: 'subscription'
        });
    }
    headers = {
        Company: 'Company',
        Country: 'Country',
        Subscription: 'Subscription',
        Validform: 'Valid Form',
        Validuntil: 'Valid Until',
        Licensenumber: 'License Number',
        Licensestatus: 'License Status'
    };
    allData = [
        {
            Company: 'Addinn',
            Country: 'USA',
            Subscription: 'label',
            Validform: '12-12-2023',
            Validuntil: '24-12-2023',
            Packagedetails: 'Package    : GOLD Iot Device : 5 Storage     : 600 MB',
            Invoicing: 'Yearly',
            Licensenumber: '50',
            Licensestatus: 'Active',
            action: ''
        },
        {
            Company: 'Addinn',
            Country: 'France',
            Subscription: 'label',
            Validform: '12-12-2023',
            Validuntil: '24-12-2023',
            Packagedetails: 'Package    : GOLD Iot Device : 5 Storage     : 600 MB',
            Invoicing: 'Yearly',
            Licensenumber: '10',
            Licensestatus: 'Expired',
            action: ''
        },
        {
            Company: 'Addinn',
            Country: 'Germany',
            Subscription: 'label',
            Validform: '12-12-2023',
            Validuntil: '24-12-2023',
            Packagedetails: 'Package    : GOLD Iot Device : 5 Storage     : 600 MB',
            Invoicing: 'Montly',
            Licensenumber: '25',
            Licensestatus: 'Active',
            action: ''
        },
        {
            Company: 'Addinn',
            Country: 'Tunisia',
            Subscription: 'label',
            Validform: '12-12-2023',
            Validuntil: '24-12-2023',
            Packagedetails: 'Package    : GOLD Iot Device : 5 Storage     : 600 MB',
            Invoicing: 'Yearly',
            Licensenumber: '100',
            Licensestatus: 'Expired',
            action: ''
        },
        {
            Company: 'Addinn',
            Country: 'USA',
            Subscription: 'label',
            Validform: '12-12-2023',
            Validuntil: '24-12-2023',
            Packagedetails: 'Package    : GOLD Iot Device : 5 Storage     : 600 MB',
            Invoicing: 'Yearly',
            Licensenumber: '70',
            Licensestatus: 'Active',
            action: ''
        },
        {
            Company: 'Addinn',
            Country: 'USA',
            Subscription: 'label',
            Validform: '12-12-2023',
            Validuntil: '24-12-2023',
            Packagedetails: 'Package    : GOLD Iot Device : 5 Storage     : 600 MB',
            Invoicing: 'Monthly',
            Licensenumber: '20',
            Licensestatus: 'Expired',
            action: ''
        },
        {
            Company: 'Addinn',
            Country: 'USA',
            Subscription: 'label',
            Validform: '12-12-2023',
            Validuntil: '24-12-2023',
            Packagedetails: 'Package    : GOLD Iot Device : 5 Storage     : 600 MB',
            Invoicing: 'Yearly',
            Licensenumber: '10',
            Licensestatus: 'Active',
            action: ''
        },
        {
            Company: 'Addinn',
            Country: 'Germany',
            Subscription: 'label',
            Validform: '12-12-2023',
            Validuntil: '24-12-2023',
            Packagedetails: 'Package    : GOLD Iot Device : 5 Storage     : 600 MB',
            Invoicing: 'Monthly',
            Licensenumber: '90',
            Licensestatus: 'Active',
            action: ''
        },
        {
            Company: 'Addinn',
            Country: 'Tunisia',
            Subscription: 'label',
            Validform: '12-12-2023',
            Validuntil: '24-12-2023',
            Packagedetails: 'Package    : GOLD Iot Device : 5 Storage     : 600 MB',
            Invoicing: 'Yearly',
            Licensenumber: '66',
            Licensestatus: 'Expired',
            action: ''
        },
        {
            Company: 'Addinn',
            Country: 'USA',
            Subscription: 'label',
            Validform: '12-12-2023',
            Validuntil: '24-12-2023',
            Packagedetails: 'Package    : GOLD Iot Device : 5 Storage     : 600 MB',
            Invoicing: 'Yearly',
            Licensenumber: '45',
            Licensestatus: 'Active',
            action: ''
        }
    ];

  actionButtons: IButtonAction = {
      isEdit: true,
      isDelete: true,
      isReadOnly: true,
  };
  addSubscription(event: unknown) {
      console.log(event);
  }
  Cards: Icard[] =[
      {description:"Total Subscriptions", icon:"assets/icon/sidebarIcon/file-text.svg", num_stat:120},
      {description:"Near to expire", icon:"assets/icon/sidebarIcon/ClockCountdown.svg", num_stat:40}
  ]

  addUpdateSubscription(event:any){
    console.log('test from subscription')
    this.router.navigate(['admin/list-subscription/subscription-management'])
  }

  openDeleteDialog(element: any): void {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '50px',
      data: { module: 'subscription', element },
     // data: { element, isDelete: true }, // Pass the element to the delete popup
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        // Call your delete API or perform deletion logic here
        console.log('Deleting element: ', element);
      } else {
        console.log('Deletion canceled');
      }
    });
  }
  
  overviewSubscription(){
    this.showOverView=true
  
  
  //   const dialogRef = this.dialog.open(OverviewComponent, {
  
  // });
  }
  
  closeOverView(){
    this.showOverView=false
  }


}
