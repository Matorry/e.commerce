import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'e-commerce-product.list',
  templateUrl: './product.list.component.html',
  styleUrls: ['./product.list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private state: StateService, private service: ProductService) {
    this.state.getProducts().subscribe((resp) => (this.products = resp));
  }

  ngOnInit(): void {
    this.service.getProductList();
  }

  handleAddToCart(product: Product) {
    this.service.addToCart(product);
  }
}
