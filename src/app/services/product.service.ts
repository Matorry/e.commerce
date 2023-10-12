import { Injectable } from '@angular/core';
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
}
