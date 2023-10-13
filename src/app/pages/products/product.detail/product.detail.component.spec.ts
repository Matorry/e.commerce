import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { StateService } from 'src/app/services/state.service';

import { ProductDetailComponent } from './product.detail.component';

describe('Given the class ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let stateService: StateService;

  describe('When I instantiate it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProductDetailComponent],
        imports: [RouterTestingModule],
        providers: [
          StateService,
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: convertToParamMap({ id: '1' }),
              },
            },
          },
        ],
      });

      fixture = TestBed.createComponent(ProductDetailComponent);
      component = fixture.componentInstance;
      stateService = TestBed.inject(StateService);
    });

    it('Then the component should be created', () => {
      expect(component).toBeTruthy();
    });

    it('Then the component should retrieve product details from StateService', () => {
      const mockProducts = [
        { id: 1, name: 'Product 1', rating: { rate: 1 } } as unknown as Product,
        { id: 2, name: 'Product 2', rating: { rate: 2 } } as unknown as Product,
      ];

      spyOn(stateService, 'getProducts').and.returnValue(of(mockProducts));

      fixture.detectChanges();

      expect(stateService.getProducts).toHaveBeenCalled();
      expect(component.product).toEqual(mockProducts[0]);
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
