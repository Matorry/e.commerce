/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  describe('When I instantiate it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProductListComponent, ProductCardComponent],
        imports: [HttpClientTestingModule, RouterTestingModule],
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

    it('Then the component should initialize products from RepoCommerceService', () => {
      const mockProducts = [{} as Product];
      spyOn(repo, 'getAll').and.returnValue(of(mockProducts));

      component.ngOnInit();

      expect(repo.getAll).toHaveBeenCalled();
      expect(component.products).toEqual(mockProducts);
    });
  });
});
