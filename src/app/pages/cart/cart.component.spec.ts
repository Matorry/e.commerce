/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { LogedUser } from 'src/app/model/user.model';
import { ProductService } from 'src/app/services/product.service';
import { RepoCommerceService } from 'src/app/services/repo.commerce.service';
import { StateService } from 'src/app/services/state.service';
import { CartComponent } from './cart.component';

describe('Given the class CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let stateService: StateService;
  let repoCommerce: RepoCommerceService;
  describe('When I instantiate it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CartComponent],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [StateService, ProductService, RepoCommerceService],
      });
      fixture = TestBed.createComponent(CartComponent);
      stateService = TestBed.inject(StateService);
      repoCommerce = TestBed.inject(RepoCommerceService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Then should create CartComponent', () => {
      expect(component).toBeTruthy();
    });

    it('Then should return correct star rating for a given decimal value', () => {
      expect(component.getStarRating(4.6)).toBe('⭐⭐⭐⭐⭐');
      expect(component.getStarRating(3.8)).toBe('⭐⭐⭐⭐☆');
      expect(component.getStarRating(2.2)).toBe('⭐⭐☆☆☆');
      expect(component.getStarRating(1.9)).toBe('⭐⭐☆☆☆');
      expect(component.getStarRating(0.7)).toBe('⭐☆☆☆☆');
      expect(component.getStarRating(0)).toBe('☆☆☆☆☆');
    });

    it('Then should calculate total price correctly', () => {
      const total = component.getTotalPrice([
        { price: 3 } as unknown as Product,
        { price: 2 } as unknown as Product,
      ]);
      expect(total).toEqual(5);
    });

    it('Then should remove a product from the cart', () => {
      spyOn(stateService, 'getCart').and.returnValue(
        of([{ id: 3 } as unknown as Product])
      );
      spyOn(stateService, 'setCart');
      component.removeFromCart({ id: 3 } as unknown as Product);
      expect(stateService.getCart).toHaveBeenCalled();
      expect(stateService.setCart).toHaveBeenCalled();
    });

    it('Then should set isUserLoggedIn to true when a logged user is returned', () => {
      stateService.setUser({ token: 'test' } as unknown as LogedUser);

      expect(component.isUserLoggedIn).toEqual(true);
    });
  });
});
