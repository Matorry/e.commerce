import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          MatIconModule,
          MatCardModule,
          MatTabsModule,
          MatButtonModule,
          MatSnackBarModule,
        ],
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

    it('Then the component should be successfully created', () => {
      expect(component).toBeTruthy();
    });

    it('Then the component should fetch product details from StateService on initialization', () => {
      const mockProducts = [
        { id: 1, name: 'Product 1', rating: { rate: 1 } } as unknown as Product,
        { id: 2, name: 'Product 2', rating: { rate: 2 } } as unknown as Product,
      ];

      spyOn(stateService, 'getProducts').and.returnValue(of(mockProducts));

      fixture.detectChanges();

      expect(stateService.getProducts).toHaveBeenCalled();
      expect(component.product).toEqual(mockProducts[0]);
    });

    it('Then should correctly format star ratings for decimal values', () => {
      expect(component.getStarRating(4.5)).toBe('⭐⭐⭐⭐⭐');
      expect(component.getStarRating(3.75)).toBe('⭐⭐⭐⭐☆');
      expect(component.getStarRating(2.25)).toBe('⭐⭐☆☆☆');
      expect(component.getStarRating(1.8)).toBe('⭐⭐☆☆☆');
      expect(component.getStarRating(0.5)).toBe('⭐☆☆☆☆');
    });

    it('Then should call stateService.setCart when handleAddToCart is called', () => {
      spyOn(stateService, 'setCart');
      const mockProduct = {
        id: 1,
        name: 'Product 1',
        rating: { rate: 1 },
      } as unknown as Product;
      component.handleAddToCart(mockProduct);

      expect(stateService.setCart).toHaveBeenCalledWith([mockProduct]);
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
