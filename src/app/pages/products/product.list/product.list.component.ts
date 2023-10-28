import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { StateService } from 'src/app/services/state.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'e-commerce-product.list',
  templateUrl: './product.list.component.html',
  styleUrls: ['./product.list.component.scss'],
})
export class ProductListComponent {
  durationInSeconds = 1;
  products: Product[] = [];
  categories: string[] = [];
  category = '';

  constructor(
    private state: StateService,
    private service: ProductService,
    private _snackBar: MatSnackBar
  ) {
    this.state.getProducts().subscribe((resp) => (this.products = resp));
    this.state.getCurrentCategory().subscribe((resp) => (this.category = resp));
  }

  handleAddToCart(product: Product) {
    this.service.addToCart(product);
    this.openSnackBar();
  }

  filterProducts(category: string) {
    this.service.getCategoryProducts(category);
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
