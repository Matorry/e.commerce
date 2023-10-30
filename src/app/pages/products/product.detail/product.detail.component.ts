import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'e-commerce-product-detail',
  templateUrl: './product.detail.component.html',
  styleUrls: ['./product.detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  id: string | null = null;
  product: Product | undefined;
  counter = 1;

  constructor(
    private state: StateService,
    private route: ActivatedRoute,
    private service: ProductService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.state.getProducts().subscribe((resp) => {
      this.product = resp.find((product) => product.id === Number(this.id));
    });
  }

  getStarRating(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? '⭐' : '';
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return '⭐'.repeat(fullStars) + halfStar + '☆'.repeat(emptyStars);
  }

  openSnackBar() {
    this.service.openSnackBar('Item added to your cart', 1);
  }

  handleAddToCart(product: Product) {
    product.quantity = this.counter;
    this.counter = 1;
    this.service.addToCart(product);
    this.openSnackBar();
  }

  handleMore() {
    this.counter++;
  }
  handleLess() {
    if (this.counter > 1) this.counter--;
  }
}
