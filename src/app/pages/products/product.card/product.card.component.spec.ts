import { ComponentFixture, TestBed } from '@angular/core/testing';

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
  });
});
