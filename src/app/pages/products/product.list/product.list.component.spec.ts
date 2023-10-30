/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { RepoCommerceService } from 'src/app/services/repo.commerce.service';
import { StateService } from 'src/app/services/state.service';
import { ProductCardComponent } from '../product.card/product.card.component';
import { ProductListComponent } from './product.list.component';

describe('Given the class ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let stateService: StateService;
  let productService: ProductService;
  let repo: RepoCommerceService;

  describe('When the component is instantiated', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProductListComponent, ProductCardComponent],
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          MatSelectModule,
          BrowserAnimationsModule,
          MatSnackBarModule,
        ],
        providers: [StateService, ProductService, RepoCommerceService],
      });

      fixture = TestBed.createComponent(ProductListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      stateService = TestBed.inject(StateService);
      productService = TestBed.inject(ProductService);
      repo = TestBed.inject(RepoCommerceService);
    });

    it('Then the component should be created', () => {
      expect(component).toBeTruthy();
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

    it('Then sould call filterProducts', () => {
      spyOn(stateService, 'setCurrentCategory');
      spyOn(stateService, 'setProducts');
      spyOn(repo, 'getCategoryProducts').and.returnValue(
        of([{} as unknown as Product])
      );
      component.filterProducts('');
      expect(stateService.setCurrentCategory).toHaveBeenCalled();
      expect(stateService.setProducts).toHaveBeenCalled();
    });
  });
});
