import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IbuttonToggle } from 'src/app/core/models/button-toggle';
import { Icard } from 'src/app/core/models/card';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() buttonLabel: string;
    @Input() Cards: Icard[];
    @Input() toggleList: IbuttonToggle[];
    @Output() addElement = new EventEmitter();
    @Output() toggleHandler = new EventEmitter();

    addNewElement() {
      this.addElement.emit(true);
    }

    changetoggle(toggle:string){
      this.toggleHandler.emit(toggle)
    }
}
