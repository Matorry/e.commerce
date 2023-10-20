import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/product.model';
import { LogedUser, User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private productList$: BehaviorSubject<Product[]>;
  private categories$: BehaviorSubject<string[]>;
  private currentCategory$: BehaviorSubject<string>;
  private cart$: BehaviorSubject<Product[]>;
  private user$: BehaviorSubject<LogedUser>;

  constructor() {
    this.productList$ = new BehaviorSubject([] as Product[]);
    this.categories$ = new BehaviorSubject([] as string[]);
    this.currentCategory$ = new BehaviorSubject('' as string);
    this.cart$ = new BehaviorSubject([] as Product[]);
    this.user$ = new BehaviorSubject({} as LogedUser);
  }

  getUser() {
    return this.user$.asObservable();
  }

  setUser(user: LogedUser) {
    this.user$.next(user);
  }

  getCurrentCategory() {
    return this.currentCategory$.asObservable();
  }

  setCurrentCategory(category: string) {
    this.currentCategory$.next(category);
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

  logOut() {
    this.user$.next({ user: {} as User, token: '' });
  }
}
