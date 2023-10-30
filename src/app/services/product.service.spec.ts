import { TestBed } from '@angular/core/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductService } from './product.service';
import { RepoCommerceService } from './repo.commerce.service';
import { StateService } from './state.service';

describe('Given the class ProductService', () => {
  let service: ProductService;
  let repo: RepoCommerceService;
  let stateService: StateService;

  describe('When I access its methods', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MatSnackBarModule],
        providers: [
          ProductService,
          {
            provide: RepoCommerceService,
            useValue: {
              getAll: () => of([] as Product[]),
              getCategories: () => of([] as string[]),
              getCategoryProducts: () => of([] as Product[]),
            },
          },
          StateService,
        ],
      });
      service = TestBed.inject(ProductService);
      repo = TestBed.inject(RepoCommerceService);
      stateService = TestBed.inject(StateService);
    });

    it('Then should be created', () => {
      expect(service).toBeTruthy();
    });

    it('Then should call setCategories', () => {
      spyOn(repo, 'getCategories').and.returnValue(of(['test']));
      spyOn(stateService, 'setCategories');

      service.getCategoriesList();

      expect(repo.getCategories).toHaveBeenCalledWith();
      expect(stateService.setCategories).toHaveBeenCalledWith(['test']);
    });

    it('Then should call getCategoryProducts and repo returns an error', () => {
      spyOn(repo, 'getCategoryProducts').and.returnValue(
        throwError('Simulated error')
      );
      spyOn(stateService, 'setProducts');
      spyOn(stateService, 'setCurrentCategory');

      service.getCategoryProducts('');

      expect(repo.getCategoryProducts).toHaveBeenCalledWith('');
      expect(stateService.setProducts).not.toHaveBeenCalled();
      expect(stateService.setCurrentCategory).not.toHaveBeenCalled();
    });

    it('Then should call getCategoryProducts', () => {
      spyOn(repo, 'getCategoryProducts').and.returnValue(
        of([{} as unknown as Product])
      );
      spyOn(stateService, 'setProducts');
      spyOn(stateService, 'setCurrentCategory');

      service.getCategoryProducts('');

      expect(repo.getCategoryProducts).toHaveBeenCalledWith('');
      expect(stateService.setProducts).toHaveBeenCalledWith([
        { quantity: 1 } as unknown as Product,
      ]);
      expect(stateService.setCurrentCategory).toHaveBeenCalledWith('');
    });

    it('Then should call setCategories and repo returns an error', () => {
      spyOn(repo, 'getCategories').and.returnValue(
        throwError('Simulated error')
      );
      spyOn(stateService, 'setCategories');

      service.getCategoriesList();

      expect(repo.getCategories).toHaveBeenCalledWith();
      expect(stateService.setCategories).not.toHaveBeenCalled();
    });

    it('Then should call getProductList', () => {
      spyOn(repo, 'getAll').and.returnValue(of([{ id: 1 } as Product]));
      spyOn(stateService, 'setProducts');

      service.getProductList();

      expect(repo.getAll).toHaveBeenCalledWith();
      expect(stateService.setProducts).toHaveBeenCalledWith([
        { id: 1, quantity: 1 } as Product,
      ]);
    });

    it('Then should call getProductList and repo returns an error', () => {
      spyOn(repo, 'getAll').and.returnValue(throwError('Simulated error'));
      spyOn(stateService, 'setProducts');

      service.getProductList();

      expect(repo.getAll).toHaveBeenCalledWith();
      expect(stateService.setProducts).not.toHaveBeenCalled();
    });

    it('Then should add a new product to the cart', () => {
      const product = { id: '2' } as unknown as Product;
      service.addToCart(product);
      stateService.getCart().subscribe((res) => expect(res).toEqual([product]));
    });

    it('Then should add a new product to the cart', () => {
      const product = { id: 2, quantity: 1 } as unknown as Product;
      stateService.setCart([{ id: 2, quantity: 1 } as unknown as Product]);
      service.addToCart(product);
      stateService
        .getCart()
        .subscribe((res) =>
          expect(res).toEqual([{ id: 2, quantity: 2 } as unknown as Product])
        );
    });

    it('Then should remove a product from the cart', () => {
      const product = { id: '2' } as unknown as Product;
      service.addToCart(product);
      service.removeFromCart(product);
      stateService.getCart().subscribe((res) => expect(res).toEqual([]));
    });

    it('Then should remove one product from the cart', () => {
      const product = { id: '2', quantity: 1 } as unknown as Product;
      service.addToCart(product);
      service.removeOneFromCart(product);
      stateService.getCart().subscribe((res) => expect(res).toEqual([]));
    });

    it('Then should clear the cart', () => {
      const product = { id: '2' } as unknown as Product;
      service.addToCart(product);
      service.clearCart();
      stateService.getCart().subscribe((res) => expect(res).toEqual([]));
    });
  });
});
