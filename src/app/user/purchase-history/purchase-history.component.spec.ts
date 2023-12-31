import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from 'src/app/model/product.model';
import { Purchase } from 'src/app/model/user.model';
import { PurchaseHistoryComponent } from './purchase-history.component';

describe('Given the class PurchaseHistoryComponent', () => {
  let component: PurchaseHistoryComponent;
  let fixture: ComponentFixture<PurchaseHistoryComponent>;

  describe('When the component is instantiated', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PurchaseHistoryComponent],
        imports: [HttpClientTestingModule, MatIconModule, MatSnackBarModule],
      });
      fixture = TestBed.createComponent(PurchaseHistoryComponent);
      component = fixture.componentInstance;

      const initialPurchaseHistory: Purchase[] = [
        {
          isOpen: true,
          products: [],
          date: 'test',
          amount: 'test',
        } as Purchase,
      ];

      component.purchaseHistory = initialPurchaseHistory;

      fixture.detectChanges();
    });

    it('Then, should create', () => {
      expect(component).toBeTruthy();
    });

    it('Then, should initialize purchaseHistory with isOpen set to false for each element', () => {
      component.purchaseHistory.forEach((element) => {
        expect(element.isOpen).toBe(false);
      });
    });

    it('Then should calculate product price correctly', () => {
      const total = component.getProductPrice({
        price: 3,
        quantity: 1,
      } as unknown as Product);
      expect(total).toEqual(3);
    });

    it('Then, should toggle isOpen property of a purchase', () => {
      const purchase = { isOpen: false } as Purchase;
      component.togglePurchase(purchase);
      expect(purchase.isOpen).toBe(true);

      component.togglePurchase(purchase);
      expect(purchase.isOpen).toBe(false);
    });
  });
});
