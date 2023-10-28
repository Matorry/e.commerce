import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from 'src/app/model/product.model';
import { ProductCardComponent } from './product.card.component';

describe('Given the class ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  describe('When I instantiate it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProductCardComponent],
      });
      fixture = TestBed.createComponent(ProductCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Then the component should be created', () => {
      expect(component).toBeTruthy();
    });

    it('Then should return correct star rating for a given decimal value', () => {
      expect(component.getStarRating(4.5)).toBe('⭐⭐⭐⭐⭐');
      expect(component.getStarRating(3.75)).toBe('⭐⭐⭐⭐☆');
      expect(component.getStarRating(2.25)).toBe('⭐⭐☆☆☆');
      expect(component.getStarRating(1.8)).toBe('⭐⭐☆☆☆');
      expect(component.getStarRating(0.5)).toBe('⭐☆☆☆☆');
    });

    it("Then should call 'next' method on EventEmitter when addToCart is triggered", () => {
      spyOn(EventEmitter.prototype, 'next');
      const mockProduct = {
        id: 1,
        name: 'Product 1',
        rating: { rate: 1 },
      } as unknown as Product;
      component.addToCart(mockProduct);

      expect(EventEmitter.prototype.next).toHaveBeenCalledWith(mockProduct);
    });

    it('Then should call handleMore method', () => {
      const mockProduct = {
        id: 1,
        quantity: 2,
      } as unknown as Product;
      component.handleMore(mockProduct);
      expect(mockProduct.quantity).toEqual(3);
    });
    it('Then should call handleLess method', () => {
      const mockProduct = {
        id: 1,
        quantity: 2,
      } as unknown as Product;
      component.handleLess(mockProduct);
      expect(mockProduct.quantity).toEqual(1);
    });
  });
});
