import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IbuttonToggle } from 'src/app/core/models/button-toggle';

@Component({
    selector: 'app-button-toggles',
    templateUrl: './button-toggles.component.html',
    styleUrls: ['./button-toggles.component.scss']
})
export class ButtonTogglesComponent {
    @Input() toggleList: IbuttonToggle[];
    @Output() toggleHandler = new EventEmitter();
    selectedFontStyle: string = 'bold';
    selectedtoggle: string = 'Packages';
    constructor(private actvatedRoute:ActivatedRoute) {}
    ngOnInit(): void {
        this.actvatedRoute.queryParams.subscribe((params) => {
            if (params['from']) {
                this.selectedtoggle = params['from'];
            }
        });
    }

    changeToggles(toggleName: string) {
        this.toggleHandler.emit(toggleName)
    }
}
