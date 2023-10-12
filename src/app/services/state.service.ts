import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private productList$: BehaviorSubject<Product[]>;
  private categories$: BehaviorSubject<string[]>;
  constructor() {
    this.productList$ = new BehaviorSubject([] as Product[]);
    this.categories$ = new BehaviorSubject([] as string[]);
  }
  getProducts() {
    return this.productList$.asObservable();
  }
  setProducts(products: Product[]) {
    return this.productList$.next(products);
  }
  getCategories() {
    return this.categories$.asObservable();
  }
  setCategories(categories: string[]) {
    return this.categories$.next(categories);
  }
}
