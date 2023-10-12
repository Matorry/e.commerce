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
    this.url = 'https://fakestoreapi.com/products';
  }

  getAll(): Observable<Product[]> {
    return this.http.get(this.url, {}) as Observable<Product[]>;
  }

  getById(id: string): Observable<Product> {
    return this.http.get(this.url + '/' + id, {}) as Observable<Product>;
  }

  getCategories(): Observable<string[]> {
    return this.http.get(this.url + '/categories', {}) as Observable<string[]>;
  }

  getCategory(section: string): Observable<Product[]> {
    return this.http.get(this.url + '/' + section, {}) as Observable<Product[]>;
  }
}
