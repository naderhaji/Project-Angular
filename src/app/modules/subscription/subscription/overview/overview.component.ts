import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  @Output() closeOverView = new EventEmitter();
  constructor(
  ){}

  close(){
    this.closeOverView.emit(true)
  }
}
