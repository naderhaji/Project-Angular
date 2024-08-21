import { Component, OnDestroy, OnInit } from '@angular/core';
import { IButtonAction } from 'src/app/core/models/button-actions';
import { Icard } from 'src/app/core/models/card';
import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateUsersComponent } from '../add-update-users/add-update-users.component';
import { DeletePopupComponent } from 'src/app/shared/delete-popup/delete-popup.component';
import { UsersService } from 'src/app/services/users/users.service';
import { IUser } from 'src/app/core/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ToasterService } from 'src/app/services/toaster/toaster.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    providers: [DatePipe]
})
export class UsersComponent implements OnInit, OnDestroy {
    users: IUser[];
    componentDestroyed$: Subject<boolean> = new Subject();
    totalLength: number;
    pageSize: number;
    headers = {
        companyName: 'Company Name',
        fullName: 'Full Name',
        email: 'Email address',
        phone: 'Phone number',
        roleName: 'Role',
        lastConnection: 'Last login',
        modifiedDate: 'Updated at'
    };

    actionButtons: IButtonAction = {
        isEdit: true,
        isLockKey: true,
        isDelete: true
    };
    Cards: Icard[] = [];
    constructor(
        public navbar: NavbarService,
        public dialog: MatDialog,
        private userService: UsersService,
        private datePipe: DatePipe,
        private toastServ: ToasterService
    ) {
        this.setNavbar();
    }

    ngOnInit(): void {
        this.getUsers();
        this.getCardData();
    }

    setNavbar() {
        this.navbar.setNavBar({
            breadcrumbTitle: 'Users',
            breadcrumbIcon: 'users'
        });
    }

    addUser() {
        this.openDialog();
    }

    openDeleteDialog(user: IUser): void {
        const dialogRef = this.dialog.open(DeletePopupComponent, {
            width: '50px',
            data: { module: 'delete' + ' ' + user.firstName + ' ' + user.lastName + ' ' + 'user' }
        });
        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((result) => {
                if (result) {
                    this.userService.deleteUser(user.id).subscribe(
                        (res) => {
                            if (res) {
                                this.toastServ.successToast('User is successfully deleted');
                                this.getUsers();
                                this.getCardData();
                            }
                        },
                        (error) => this.toastServ.errorToast(error.error[0].errorMessage)
                    );
                }
            });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AddUpdateUsersComponent, {
            width: '800px'
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((result) => {
                if (result) {
                    this.getUsers();
                    this.getCardData();
                }
            });
    }

    editUser(user: any): void {
        const dialogRef = this.dialog.open(AddUpdateUsersComponent, {
            width: '800px',
            data: { user, isEdit: true }
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((result) => {
                if (result) {
                    this.getUsers();
                    this.getCardData();
                }
            });
    }

    getUsers(search: string = '', pageNumber: number = 0, pageSize: number = 5) {
        this.userService
            .getUsers(search, pageNumber, pageSize)
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((res) => {
                res.result.items.forEach((element: IUser) => {
                    let user: IUser = element;
                    user.fullName = user.firstName + ' ' + user.lastName;
                    user.modifiedDate = this.datePipe.transform(new Date(user.modifiedDate), 'dd-MM-yyyy');
                    user.lastConnection = this.datePipe.transform(new Date(user.lastConnection), 'dd-MM-yyyy');
                });
                this.users = res.result.items;
                this.totalLength = res.result.totalCount;
                this.pageSize = res.result.pageSize;
            });
    }

    onSearch(event: string) {
        this.getUsers(event);
    }

    enableUser(user: IUser) {
        const refDialog = this.dialog.open(DeletePopupComponent, {
            data: { module: 'set status' + ' ' + user.firstName + ' ' + user.lastName + ' ' + 'user' }
        });
        refDialog.afterClosed().subscribe((confirm) => {
            if (user.id && confirm) {
                this.userService.changeUserStatus(user.id).subscribe(
                    (res) => {
                        if (res) {
                            this.toastServ.successToast('User status is successfully changed');
                            this.getUsers();
                        }
                    },
                    (error) => this.toastServ.errorToast(error.error[0].errorMessage)
                );
            }
        });
    }
    onPageChange(event: any) {
        this.getUsers('', event.pageIndex, event.pageSize);
    }
    getCardData() {
        this.userService.getNumberUserAdminTenant().subscribe((data: any) => {
            this.Cards = [
                {
                    description: 'Total FreightSure Users',
                    icon: 'assets/icon/sidebarIcon/active-user.svg',
                    num_stat: data.data.totalAdmin + data.data.totalTenant
                },
                {
                    description: 'Total Admin',
                    icon: 'assets/icon/sidebarIcon/User.svg',
                    num_stat: data.data.totalAdmin
                },
                {
                    description: 'Total Tenants',
                    icon: 'assets/icon/sidebarIcon/UserSwitch.svg',
                    num_stat: data.data.totalTenant
                }
            ];
        });
    }
    ngOnDestroy(): void {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
