import { Component } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  constructor(public navbar: NavbarService) {

  }
}
