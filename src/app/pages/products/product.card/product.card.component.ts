import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'e-commerce-product-card',
  templateUrl: './product.card.component.html',
  styleUrls: ['./product.card.component.scss'],
})
export class ProductCardComponent {
  @Input() products!: Product[];
  @Output() product: EventEmitter<Product>;
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
    this.product.next(product);
  }
  handleMore(product: Product) {
    if (product.quantity) product.quantity++;
  }
  handleLess(product: Product) {
    if (product.quantity && product.quantity > 1) product.quantity--;
  }
}
