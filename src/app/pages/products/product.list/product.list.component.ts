import { Component } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'e-commerce-product.list',
  templateUrl: './product.list.component.html',
  styleUrls: ['./product.list.component.scss'],
})
export class ProductListComponent {
  products: Product[] = [];
  categories: string[] = [];
  category = '';

  constructor(private state: StateService, private service: ProductService) {
    this.state.getProducts().subscribe((resp) => (this.products = resp));
    this.state.getCurrentCategory().subscribe((resp) => (this.category = resp));
  }

  handleAddToCart(product: Product) {
    this.service.addToCart(product);
  }

  filterProducts(category: string) {
    this.service.getCategoryProducts(category);
  }
}
