import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ICompany } from 'src/app/core/models/companys';
import { IRole } from 'src/app/core/models/role';
import { IAddUser } from 'src/app/core/models/user';
import { CompanysService } from 'src/app/services/companys/companys.service';
import { RoleService } from 'src/app/services/roles/role.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-update-users',
    templateUrl: './add-update-users.component.html',
    styleUrls: ['./add-update-users.component.scss']
})
export class AddUpdateUsersComponent implements OnInit, OnDestroy {
    isEditMode: boolean;
    userData: any = {};
    submitted = false;
    userForm!: FormGroup;
    companys: ICompany[];
    roles: IRole[];
    selectedFile: any = null;
    password: string = '';
    hide1: boolean = true;
    hide2: boolean = true;
    passwordVisibilityClicked: boolean = false;
    componentDestroyed$: Subject<boolean> = new Subject();

    constructor(
        public dialogRef: MatDialogRef<AddUpdateUsersComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UsersService,
        private companyService: CompanysService,
        private roleService: RoleService,
        private toastServ: ToasterService
    ) {
        if (data && data.isEdit) {
            this.isEditMode = true;
            this.userData = data.user || {};
        }
    }
    ngOnInit(): void {
        this.userForm = new FormGroup({
            companyId: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            firstName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            repeatpassword: new FormControl('', [Validators.required]),
            phone: new FormControl('', [Validators.required]),
            roleId: new FormControl('', [Validators.required])
        });
        if (this.userData) {
            this.userForm.patchValue(this.userData);
        }
        this.getComanys();
        this.getRoles();
    }

    onSave() {
        this.submitted = true;
        Object.keys(this.userForm.controls).forEach((key) => {
            this.userForm.get(key)?.markAsTouched();
        });
        let user: IAddUser;
        user = {
            companyId: this.userForm.value.companyId,
            email: this.userForm.value.email,
            firstName: this.userForm.value.firstName,
            lastName: this.userForm.value.lastName,
            password: this.userForm.value.password,
            phone: this.userForm.value.phone,
            roleId: this.userForm.value.roleId,
            roleName: this.roles.find((role) => role.id == this.userForm.value.roleId)?.name
        };
        this.userService
            .CreateUser(user)
            .subscribe((res) => {
              this.toastServ.successToast('User is successfully added');
              this.dialogRef.close(user);
            },(error)=>
            this.toastServ.errorToast(error.error[0].errorMessage))

    }

    togglePasswordVisibility() {
        this.hide1 = !this.hide1;
        // this.passwordVisibilityClicked = !this.passwordVisibilityClicked;
    }

    toggleRepeatPasswordVisibility() {
        this.hide2 = !this.hide2;
        // this.passwordVisibilityClicked = !this.passwordVisibilityClicked;
    }

    getComanys() {
        this.companyService
            .getCompanys()
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((res) => {
                this.companys = res.result.items;
            });
    }

    getRoles() {
        this.roleService
            .getRoles()
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((res) => {
                this.roles = res.result.result.realmMappings;
            });
    }

    onUpdate() {
        let user: IAddUser;
        user = {
            userId: this.userData.id,
            companyId: this.userForm.value.companyId,
            email: this.userForm.value.email,
            firstName: this.userForm.value.firstName,
            lastName: this.userForm.value.lastName,
            password: this.userForm.value.password,
            phone: this.userForm.value.phone,
            roleId: this.userForm.value.roleId,
            roleName: this.roles.find((role) => role.id == this.userForm.value.roleId)?.name
        };
        this.userService
            .updateUser(user)
            .subscribe((res) => {
                this.toastServ.successToast('User is successfully updated');
                this.dialogRef.close(user);
            },(error)=>{
              this.toastServ.errorToast(error.error[0].errorMessage)
            })

    }

    ngOnDestroy(): void {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
