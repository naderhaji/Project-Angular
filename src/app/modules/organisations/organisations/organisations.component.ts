import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { OrganisationsService } from 'src/app/services/organisations/organisations.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { Icard } from 'src/app/core/models/card';
import { IButtonAction } from 'src/app/core/models/button-actions';

@Component({
    selector: 'app-organisations',
    templateUrl: './organisations.component.html',
    styleUrls: ['./organisations.component.scss']
})
export class OrganisationsComponent implements OnInit {
    header = {
        name: 'Organization name',
        pays: 'Country',
        urlTenant: 'Tenant URL',
        email: 'Mail',
        statut: 'Instance Status',
        SWversion: 'SW version',
        Validuntil: 'Valid until',
        Validity_status: 'Validity status'
    };
    //Fake data
    allData = [
        {
            name: 'Addinn Company',
            pays: 'Tunisia',
            urlTenant: 'http://www.example.com',
            email: 'info@yourcompany.com',
            statut: 'UP',
            SWversion: 'FR86814746707',
            Validuntil: '12-12-2023',
            Validity_status: 'Valid'
        },
        {
            name: 'Addinn Company',
            pays: 'Tunisia',
            urlTenant: 'http://www.example.com',
            email: 'info@yourcompany.com',
            statut: 'DOWN',
            SWversion: 'FR86814746707',
            Validuntil: '12-12-2023',
            Validity_status: 'Expired'
        },
        {
            name: 'Addinn Company',
            pays: 'Tunisia',
            urlTenant: 'http://www.example.com',
            email: 'info@yourcompany.com',
            statut: 'UP',
            SWversion: 'FR86814746707',
            Validuntil: '12-12-2023',
            Validity_status: 'Exipres_soon'
        },
        {
            name: 'Addinn Company',
            pays: 'Tunisia',
            urlTenant: 'http://www.example.com',
            email: 'info@yourcompany.com',
            statut: 'DOWN',
            SWversion: 'FR86814746707',
            Validuntil: '12-12-2023',
            Validity_status: 'Expired'
        },
        {
            name: 'Addinn Company',
            pays: 'Tunisia',
            urlTenant: 'http://www.example.com',
            email: 'info@yourcompany.com',
            statut: 'UP',
            SWversion: 'FR86814746707',
            Validuntil: '12-12-2023',
            Validity_status: 'Valid'
        }
    ];

    actionButtons: IButtonAction = {
        isConfiguration: true,
        isDelete: true,
        isPower: true,
        isPause: true
    };
    dataSource: unknown[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    private destroy$ = new Subject<void>();

    constructor(
        private organisationService: OrganisationsService,
        private navbar: NavbarService
    ) {
        this.setNavbar();
    }
    setNavbar() {
        this.navbar.setNavBar({
            breadcrumbTitle: 'Deployment',
            breadcrumbIcon: 'deployment'
        });
    }

    ngOnInit(): void {
        //this.getOrganisationList();
    }

    getOrganisationList() {
        this.organisationService
            .getOrganisations()
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.dataSource = res.resultat.companys;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    Cards: Icard[] = [
        { description: 'Total Deployments', icon: 'assets/icon/sidebarIcon/active-deployment.svg', num_stat: 120 },
        { description: 'Up vs Down Deployments', icon: 'assets/icon/sidebarIcon/Icon.svg', num_stat: 40 },
        { description: 'Outdated SW', icon: 'assets/icon/sidebarIcon/ts-icon-web-server (1) 1.svg', num_stat: 22 },
        { description: 'Near to expire', icon: 'assets/icon/sidebarIcon/ClockCountdown.svg', num_stat: 12 }
    ];

    
}
