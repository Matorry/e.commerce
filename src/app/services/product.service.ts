import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { RepoCommerceService } from './repo.commerce.service';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private repo: RepoCommerceService, private state: StateService) {}
  getProductList() {
    this.repo.getAll().subscribe({
      next: (response) => {
        this.state.setProducts(response);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  getCategoriesList() {
    this.repo.getCategories().subscribe({
      next: (response) => {
        this.state.setCategories(response);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  addToCart(product: Product) {
    let currentCart = [] as Product[];
    this.state.getCart().subscribe((data) => (currentCart = data));
    currentCart.push(product);
    this.state.setCart(currentCart);
  }

  removeFromCart(product: Product) {
    let currentCart = [] as Product[];
    this.state.getCart().subscribe((data) => (currentCart = data));
    const index = currentCart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      currentCart.splice(index, 1);
      this.state.setCart(currentCart);
    }
  }

  clearCart() {
    this.state.setCart([]);
  }
}