import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private productList$: BehaviorSubject<Product[]>;
  private categories$: BehaviorSubject<string[]>;
  private cart$: BehaviorSubject<Product[]>;

  constructor() {
    this.productList$ = new BehaviorSubject([] as Product[]);
    this.categories$ = new BehaviorSubject([] as string[]);
    this.cart$ = new BehaviorSubject([] as Product[]);
  }

  getProducts() {
    return this.productList$.asObservable();
  }

  setProducts(products: Product[]) {
    this.productList$.next(products);
  }

  getCategories() {
    return this.categories$.asObservable();
  }

  setCategories(categories: string[]) {
    this.categories$.next(categories);
  }

  setCart(products: Product[]) {
    this.cart$.next(products);
  }

  getCart() {
    return this.cart$.asObservable();
  }
}
