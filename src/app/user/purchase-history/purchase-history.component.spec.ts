import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Purchase } from 'src/app/model/user.model';
import { PurchaseHistoryComponent } from './purchase-history.component';

describe('Given the class PurchaseHistoryComponent', () => {
  let component: PurchaseHistoryComponent;
  let fixture: ComponentFixture<PurchaseHistoryComponent>;

  describe('When I instantiate it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PurchaseHistoryComponent],
        imports: [HttpClientTestingModule],
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

    it('Then, should toggle isOpen property of a purchase', () => {
      const purchase = { isOpen: false } as Purchase;
      component.togglePurchase(purchase);
      expect(purchase.isOpen).toBe(true);

      component.togglePurchase(purchase);
      expect(purchase.isOpen).toBe(false);
    });
  });
});
