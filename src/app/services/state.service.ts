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
  private logedUser$: BehaviorSubject<LogedUser>;

  constructor() {
    this.productList$ = new BehaviorSubject([] as Product[]);
    this.categories$ = new BehaviorSubject([] as string[]);
    this.currentCategory$ = new BehaviorSubject('' as string);
    this.cart$ = new BehaviorSubject([] as Product[]);
    this.logedUser$ = new BehaviorSubject({} as LogedUser);
  }

  getUser() {
    return this.logedUser$.asObservable();
  }

  setUser(logedUser?: LogedUser, user?: User) {
    if (logedUser) this.logedUser$.next(logedUser);
    if (user) this.logedUser$.next({ ...this.logedUser$.value, user });
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
    this.logedUser$.next({ user: {} as User, token: '' });
  }
}
