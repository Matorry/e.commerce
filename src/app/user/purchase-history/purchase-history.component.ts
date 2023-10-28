import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { Purchase } from 'src/app/model/user.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'e-commerce-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss'],
})
export class PurchaseHistoryComponent implements OnInit {
  constructor(private service: ProductService) {}
  @Input() purchaseHistory: Purchase[] = [];

  ngOnInit(): void {
    if (this.purchaseHistory)
      this.purchaseHistory.forEach((element) => (element.isOpen = false));
  }

  togglePurchase(purchase: Purchase) {
    purchase.isOpen = !purchase.isOpen;
  }

  getProductPrice(product: Product) {
    return this.service.totalProductPrice(product);
  }
}
