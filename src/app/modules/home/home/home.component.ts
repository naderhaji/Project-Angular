import { Component } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public navbar : NavbarService){
    this.setNavbar()
  }
  setNavbar() {
        this.navbar.setNavBar({
          breadcrumbTitle: 'home',
          breadcrumbIcon: 'home',
        });
      }
}
