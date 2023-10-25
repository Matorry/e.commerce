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
  selectedCategory = '';
  constructor(private state: StateService, private service: ProductService) {
    this.isUserLoggedIn = false;
    this.state.getCategories().subscribe((resp) => (this.categories = resp));

    this.state.getCurrentCategory().subscribe((category) => {
      this.selectedCategory = category;
    });

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

  changeCategory(category: string) {
    this.state.setCurrentCategory(category);
    this.selectedCategory = category;
    this.service.getCategoryProducts(category);
  }

  getTabIndex(): number {
    return this.categories.indexOf(this.selectedCategory);
  }
}
