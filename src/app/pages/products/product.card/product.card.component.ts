import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'e-commerce-product-card',
  templateUrl: './product.card.component.html',
  styleUrls: ['./product.card.component.scss'],
})
export class ProductCardComponent {
  @Input() cardData!: Product;
  @Output() product: EventEmitter<Product>;
  counter = 1;
  constructor() {
    this.product = new EventEmitter();
  }
  getStarRating(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? '⭐' : '';
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return '⭐'.repeat(fullStars) + halfStar + '☆'.repeat(emptyStars);
  }
  addToCart(product: Product) {
    product.quantity = this.counter;
    this.counter = 1;
    this.product.next(product);
  }
  handleMore() {
    this.counter++;
  }
  handleLess() {
    if (this.counter > 1) this.counter--;
  }
}
