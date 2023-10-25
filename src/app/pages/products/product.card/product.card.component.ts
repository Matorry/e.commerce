import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/model/product.model';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'e-commerce-product-card',
  templateUrl: './product.card.component.html',
  styleUrls: ['./product.card.component.scss'],
})
export class ProductCardComponent {
  durationInSeconds = 1;
  @Input() products!: Product[];
  @Output() product: EventEmitter<Product>;
  constructor(private _snackBar: MatSnackBar) {
    this.product = new EventEmitter();
  }
  getStarRating(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? '⭐' : '';
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return '⭐'.repeat(fullStars) + halfStar + '☆'.repeat(emptyStars);
  }
  addToCart(product: Product) {
    this.product.next(product);
    this.openSnackBar();
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
