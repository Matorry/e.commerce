import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { MenuOption } from 'src/app/types/menu.options';

@Component({
  selector: 'e-commerce-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuOptions: MenuOption[];
  menuOptionsLoged: MenuOption[];
  isUserLoggedIn: boolean;
  constructor(private state: StateService) {
    this.isUserLoggedIn = false;

    this.menuOptions = [
      { path: 'cart', label: 'Cart' },
      { path: '/user/login', label: 'Login' },
    ];
    this.menuOptionsLoged = [
      { path: 'cart', label: 'Cart' },
      { path: '/user/profile', label: 'Profile' },
    ];

    this.state.getUser().subscribe((user) => {
      if (user.token) this.isUserLoggedIn = true;
    });
  }
}
