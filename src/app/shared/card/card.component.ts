import { Component, Input } from '@angular/core';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
  

})
export class CardComponent {
@Input() icon:string;
@Input() num_stat:number;
@Input() description:string;
}