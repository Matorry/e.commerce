import { Component, Input } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'e-commerce-product-card',
  templateUrl: './product.card.component.html',
  styleUrls: ['./product.card.component.scss'],
})
export class ProductCardComponent {
  @Input() products!: Product[];

  getStarRating(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? '⭐' : '';
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return '⭐'.repeat(fullStars) + halfStar + '☆'.repeat(emptyStars);
  }
}
