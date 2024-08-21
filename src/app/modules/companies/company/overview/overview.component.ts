import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICompany } from 'src/app/core/models/companys';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  @Input() company : ICompany;
  @Output() closeOverView = new EventEmitter();
  constructor(
  ){}

  close(){
    this.closeOverView.emit(true)
  }
}
