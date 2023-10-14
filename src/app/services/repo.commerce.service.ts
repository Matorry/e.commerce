import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class RepoCommerceService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = 'https://fakestoreapi.com';
  }

  getAll(): Observable<Product[]> {
    return this.http.get(this.url + '/products', {}) as Observable<Product[]>;
  }

  getById(id: string): Observable<Product> {
    return this.http.get(
      this.url + '/products/' + id,
      {}
    ) as Observable<Product>;
  }

  getCategories(): Observable<string[]> {
    return this.http.get(this.url + '/categories', {}) as Observable<string[]>;
  }

  getCategory(category: string): Observable<Product[]> {
    return this.http.get(
      this.url + '/categories/' + category,
      {}
    ) as Observable<Product[]>;
  }
}
