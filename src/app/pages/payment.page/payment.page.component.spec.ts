import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { Purchase, User } from 'src/app/model/user.model';
import { ProductService } from 'src/app/services/product.service';
import { RepoUserService } from 'src/app/services/repo.user.service';
import { StateService } from 'src/app/services/state.service';
import { ProfileComponent } from 'src/app/user/profile/profile.component';
import { PaymentPageComponent } from './payment.page.component';

describe('Given the class PaymentPageComponent', () => {
  let component: PaymentPageComponent;
  let fixture: ComponentFixture<PaymentPageComponent>;
  describe('When the component is instantiated', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PaymentPageComponent],
        imports: [
          ReactiveFormsModule,
          MatFormFieldModule,
          MatInputModule,
          BrowserAnimationsModule,
          MatSnackBarModule,
          RouterTestingModule.withRoutes([
            { path: 'user/profile', component: ProfileComponent },
          ]),
          HttpClientTestingModule,
        ],
        providers: [ProductService, RepoUserService, StateService],
      });

      fixture = TestBed.createComponent(PaymentPageComponent);
      component = fixture.componentInstance;
    });

    it('Then it should be successfully created', () => {
      expect(component).toBeTruthy();
    });

    it('Then it should correctly calculate the total price', () => {
      const products = [
        { price: 10 } as Product,
        { price: 20 } as Product,
        { price: 30 } as Product,
      ];

      spyOn(TestBed.inject(ProductService), 'getTotalPrice').and.returnValue(
        60
      );

      const totalPrice = component.getTotalPrice(products);

      expect(totalPrice).toBe(60);
    });

    it('Then it should accurately calculate the price of a product', () => {
      const total = component.getProductPrice({
        price: 3,
        quantity: 1,
      } as unknown as Product);
      expect(total).toEqual(3);
    });

    it('Then, upon form submission, it should update the user purchase history with successful response', fakeAsync(() => {
      const user: User = {
        id: '1',
        userName: 'test',
        password: 'test',
        purchaseHistory: [],
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        addressStreet: 'test',
        postalCode: 'test',
        city: 'test',
        role: 'user',
      };
      component.user = user;

      spyOn(TestBed.inject(RepoUserService), 'patch').and.returnValue(
        of({} as unknown as User)
      );
      spyOn(TestBed.inject(ProductService), 'clearCart');
      spyOn(TestBed.inject(ProductService), 'getTotalPrice').and.returnValue(
        100
      );
      spyOn(TestBed.inject(StateService), 'getUser').and.returnValue(
        of({ user: user, token: '1' })
      );
      spyOn(TestBed.inject(StateService), 'getCart').and.returnValue(
        of([
          { product: 'Product 1' } as unknown as Product,
          { product: 'Product 2' } as unknown as Product,
        ])
      );

      component.paymentForm.setValue({
        creditCardNumber: '1234123412341234',
        expirationDate: '12/12',
        securityCode: '123',
      });

      component.onSubmit();

      tick(1000);

      fixture.detectChanges();

      expect(user.purchaseHistory.length).toBe(1);
      const purchase: Purchase = user.purchaseHistory[0];
      expect(purchase.products).toEqual([]);
      expect(purchase.amount).toBe('100');
      expect(TestBed.inject(RepoUserService).patch).toHaveBeenCalled();
      expect(TestBed.inject(ProductService).clearCart).toHaveBeenCalled();
    }));
    it('Then, upon form submission, it should update the user purchase history upon encountering an error', fakeAsync(() => {
      const user: User = {
        id: '1',
        userName: 'test err',
        password: 'test err',
        purchaseHistory: [],
        firstName: 'test err',
        lastName: 'test err',
        email: 'test err',
        addressStreet: 'test err',
        postalCode: 'test err',
        city: 'test err',
        role: 'user',
      };
      component.user = user;
      spyOn(TestBed.inject(StateService), 'getUser').and.returnValue(
        of({ user: user, token: '2' })
      );
      spyOn(TestBed.inject(StateService), 'getCart').and.returnValue(
        of([
          { product: 'Product 3' } as unknown as Product,
          { product: 'Product 4' } as unknown as Product,
        ])
      );
      const error = () => new Error('Error de inicio de sesión');

      spyOn(TestBed.inject(RepoUserService), 'patch').and.returnValue(
        throwError(error)
      );
      spyOn(TestBed.inject(ProductService), 'clearCart');
      spyOn(TestBed.inject(ProductService), 'getTotalPrice').and.returnValue(0);

      component.paymentForm.setValue({
        creditCardNumber: '1234567890123456',
        expirationDate: '01/01',
        securityCode: '456',
      });

      component.onSubmit();

      tick(1000);

      fixture.detectChanges();

      expect(TestBed.inject(RepoUserService).patch).toHaveBeenCalled();
      expect(TestBed.inject(ProductService).clearCart).toHaveBeenCalled();
      expect(user.purchaseHistory.length).toBe(1);
      const purchase: Purchase = user.purchaseHistory[0];
      expect(purchase.products).toEqual([]);
      expect(purchase.amount).toBe('0');
    }));
  });
});
