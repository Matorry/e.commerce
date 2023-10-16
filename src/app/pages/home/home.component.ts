import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'e-commerce-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  products: Product[] = [];

  constructor(private service: ProductService, private state: StateService) {
    this.state.getCategories().subscribe((resp) => (this.categories = resp));
    this.state.getProducts().subscribe((resp) => (this.products = resp));
  }

  ngOnInit(): void {
    this.service.getCategoriesList();
    this.service.getProductList();
  }

  getCategoryClass(category: string): string {
    return category.replace("'s clothing", '').toLowerCase();
  }
}
