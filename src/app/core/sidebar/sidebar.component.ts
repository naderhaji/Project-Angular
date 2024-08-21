import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IMenuItem } from '../models/sideBar';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    @Output() opened = new EventEmitter<boolean>();
    menuItems: IMenuItem[] = [
        {
            label: 'Home',
            activeIcon: 'assets/icon/sidebarIcon/active-home.svg',
            inactiveIcon: 'assets/icon/sidebarIcon/inactive-home.svg',
            route: '/admin/home',
            role: ['admin']
            // disabled: true,
        },
        {
            label: 'Deployment',
            activeIcon: 'assets/icon/sidebarIcon/active-deployment.svg',
            inactiveIcon: 'assets/icon/sidebarIcon/inactive-deployment.svg',
            route: '/admin/list-organisation',
            role: ['admin']
        },
        {
            label: 'Companies',
            activeIcon: 'assets/icon/sidebarIcon/Buildings.svg',
            inactiveIcon: 'assets/icon/sidebarIcon/inactive-Buildings.svg',
            route: '/admin/list-company',
            role: ['admin']
        },
        {
            label: 'Subscription',
            activeIcon: 'assets/icon/sidebarIcon/active-subscription.svg',
            inactiveIcon: 'assets/icon/sidebarIcon/inactive-subscription.svg',
            route: '/admin/list-subscription',
            role: ['admin']
        },
        {
            label: 'Users',
            activeIcon: 'assets/icon/sidebarIcon/active-user.svg',
            inactiveIcon: 'assets/icon/sidebarIcon/inactive-user.svg',
            route: '/admin/list-users',
            role: ['admin']
        },
        {
            label: 'IOT Devices',
            activeIcon: 'assets/icon/sidebarIcon/active-iot.svg',
            inactiveIcon: 'assets/icon/sidebarIcon/inactive-iot.svg',
            route: '/admin/iot-devices',
            role: ['admin']
        },
        {
            label: 'GED',
            activeIcon: 'assets/icon/sidebarIcon/active-ged.svg',
            inactiveIcon: 'assets/icon/sidebarIcon/inactive-ged.svg',
            route: '/admin/list-ged',
            role: ['admin']
        },
        {
            label: 'Packages',
            activeIcon: 'assets/icon/sidebarIcon/active-packages.svg',
            inactiveIcon: 'assets/icon/sidebarIcon/inactive-packages.svg',
            route: '/admin/packages',
            role: ['admin']
        }
    ];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.setActiveMenuItem(); // Call initially to set the active menu item on page load

        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.setActiveMenuItem();
        });
    }

    setActiveMenuItem(): void {
        const currentRoute = this.router.url;

        this.menuItems.forEach((menuItem) => {
            menuItem.isActive = currentRoute.includes(menuItem.route);
        });
    }
    closeSideBar() {
        this.opened.emit(false);
    }

    checkUserRole(requiredRoles: string[]): boolean {
        const userRoles = ['admin'];
        return requiredRoles.some((role) => userRoles.includes(role));
    }

    logout(): void {}
}
