import { Component, Input } from '@angular/core';
import { Purchase } from 'src/app/model/user.model';

@Component({
  selector: 'e-commerce-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss'],
})
export class PurchaseHistoryComponent {
  @Input() purchaseHistory: Purchase[] = [];

  constructor() {
    this.purchaseHistory.forEach((element) => (element.isOpen = false));
  }
  togglePurchase(purchase: Purchase) {
    purchase.isOpen = !purchase.isOpen;
  }
}
