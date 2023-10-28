/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'e-commerce-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  products: Product[] = [];
  isUserLoggedIn: boolean;
  constructor(private service: ProductService, private state: StateService) {
    this.isUserLoggedIn = false;

    this.state.getCart().subscribe((resp) => (this.products = resp));

    this.state.getUser().subscribe((user) => {
      if (user.token) this.isUserLoggedIn = true;
    });
  }

  removeFromCart(product: Product) {
    this.service.removeFromCart(product);
  }
  getStarRating(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? '⭐' : '';
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return '⭐'.repeat(fullStars) + halfStar + '☆'.repeat(emptyStars);
  }

  getTotalPrice(products: Product[]) {
    return this.service.getTotalPrice(products);
  }

  getProductPrice(product: Product) {
    return this.service.totalProductPrice(product);
  }
}
