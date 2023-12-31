import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from 'src/app/model/product.model';
import { ProductCardComponent } from './product.card.component';

describe('Given the class ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  describe('When the component is instantiated', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProductCardComponent],
        imports: [MatCardModule, MatIconModule, RouterTestingModule],
      });
      fixture = TestBed.createComponent(ProductCardComponent);
      component = fixture.componentInstance;
      component.cardData = {
        id: 2,
        title: 'test',
        price: 2,
        description: 'test',
        category: 'test',
        image: 'test',
        rating: {
          rate: 2,
          count: 2,
        },
      };
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
        image: '',
      } as unknown as Product;
      component.addToCart(mockProduct);

      expect(EventEmitter.prototype.next).toHaveBeenCalledWith(mockProduct);
    });

    it('Then should call handleMore method', () => {
      component.handleMore();
      expect(component.counter).toEqual(2);
    });
    it('Then should call handleLess method', () => {
      component.counter = 2;
      component.handleLess();
      expect(component.counter).toEqual(1);
    });
  });
});
