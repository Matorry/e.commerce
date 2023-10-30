/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../core/snack-bar/snack-bar.component';
import { Product } from '../model/product.model';
import { RepoCommerceService } from './repo.commerce.service';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private repo: RepoCommerceService,
    private state: StateService,
    private snackBar: MatSnackBar
  ) {}
  getProductList() {
    this.repo.getAll().subscribe({
      next: (response) => {
        response.forEach((product) => (product.quantity = 1));
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

  getCategoryProducts(category: string) {
    this.repo.getCategoryProducts(category).subscribe({
      next: (response) => {
        response.forEach((product) => (product.quantity = 1));
        this.state.setProducts(response);
        this.state.setCurrentCategory(category);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  addToCart(product: Product) {
    let currentCart = [] as Product[];
    this.state.getCart().subscribe((data) => (currentCart = data));
    const productIndex = currentCart.findIndex(
      (element) => element.id === product.id
    );
    if (productIndex !== -1) {
      currentCart[productIndex].quantity =
        product.quantity! + currentCart[productIndex].quantity!;
    } else {
      currentCart.push(product);
    }

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

  removeOneFromCart(product: Product) {
    let currentCart = [] as Product[];
    this.state.getCart().subscribe((data) => (currentCart = data));
    const index = currentCart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      currentCart[index].quantity!--;
      if (currentCart[index].quantity === 0) this.removeFromCart(product);
    }
    this.state.setCart(currentCart);
  }

  getTotalPrice(products: Product[]): number {
    const total = Number(
      products
        .reduce(
          (accumulator, product) =>
            accumulator + this.totalProductPrice(product),
          0
        )
        .toFixed(2)
    );

    return (total * 100) / 100;
  }

  totalProductPrice(product: Product) {
    let total = 1;
    if (product.quantity) total = Number(product.price) * product.quantity;
    return (total * 100) / 100;
  }

  clearCart() {
    this.state.setCart([]);
  }

  openSnackBar(message: string, durationInSeconds: number) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: durationInSeconds * 1000,
      data: message,
    });
  }
}
