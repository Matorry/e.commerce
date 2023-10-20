import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
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
  categories: string[] = [];
  constructor(private state: StateService, private service: ProductService) {
    this.isUserLoggedIn = false;
    this.state.getCategories().subscribe((resp) => (this.categories = resp));

    this.menuOptions = [
      { path: 'home', label: 'home' },
      { path: 'cart', label: 'shopping_cart' },
      { path: '/user/login', label: 'person_outline' },
    ];

    this.menuOptionsLoged = [
      { path: 'home', label: 'home' },
      { path: 'cart', label: 'shopping_cart' },
      { path: '/user/profile', label: 'person' },
    ];

    this.state.getUser().subscribe((user) => {
      if (user.token) {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
    });
  }

  getCategory(category: string) {
    this.service.getCategoryProducts(category);
  }
}
