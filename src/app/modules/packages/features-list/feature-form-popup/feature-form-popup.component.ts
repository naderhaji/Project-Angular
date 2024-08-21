import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FeatureService } from 'src/app/services/packages/feature/feature.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';

@Component({
  selector: 'app-feature-form-popup',
  templateUrl: './feature-form-popup.component.html',
  styleUrls: ['./feature-form-popup.component.scss']
})
export class FeatureFormPopupComponent implements OnInit {
  formFeature!: FormGroup;
  submitted = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private featureServ: FeatureService,
    public dialogRef: MatDialogRef<FeatureFormPopupComponent>,
    private toastServ: ToasterService
  ) { }

  ngOnInit(): void {
    this.InitiateFormFeature();
  }

  // initaite form feature
  InitiateFormFeature() {
    this.formFeature = new FormGroup({
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
    if (this.data.feature) this.formFeature.patchValue(this.data.feature);
  }

  // Create feature
  createFeature() {
    this.featureServ.addFeature(this.formFeature.value).subscribe(
      () => {
        this.toastServ.successToast('Feature is successfully created');
        this.dialogRef.close();
      },
      (error) => this.toastServ.errorToast(error.error[0].errorMessage)
    );
  }

  // Update feature
  updateFeature() {
    this.featureServ.updateFeature(this.data.feature.id, this.formFeature.value).subscribe(
      () => {
        this.toastServ.successToast('Feature is successfully updated');
        this.dialogRef.close();
      },
      (error) => this.toastServ.errorToast(error.error[0].errorMessage)
    );
  }
  actionToCall() {
    this.submitted = true;
    Object.keys(this.formFeature.controls).forEach((key) => {
      this.formFeature.get(key)?.markAsTouched();
    });
    if (this.formFeature.invalid) {
      return;
    }
    if (this.data.feature) {
      this.updateFeature();
    } else {
      this.createFeature();
    }
  }
}
