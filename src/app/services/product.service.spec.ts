import { TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductService } from './product.service';
import { RepoCommerceService } from './repo.commerce.service';
import { StateService } from './state.service';

describe('Given the class ProductService', () => {
  let service: ProductService;
  let repoCommerceService: RepoCommerceService;
  let stateService: StateService;

  describe('When I access its methods', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ProductService,
          {
            provide: RepoCommerceService,
            useValue: {
              getAll: () => of([] as Product[]),
              getCategories: () => of([] as string[]),
            },
          },
          StateService,
        ],
      });
      service = TestBed.inject(ProductService);
      repoCommerceService = TestBed.inject(RepoCommerceService);
      stateService = TestBed.inject(StateService);
    });

    it('Then should be created', () => {
      expect(service).toBeTruthy();
    });

    it('Then should call setCategories', () => {
      spyOn(repoCommerceService, 'getCategories').and.returnValue(of(['test']));
      spyOn(stateService, 'setCategories');

      service.getCategoriesList();

      expect(repoCommerceService.getCategories).toHaveBeenCalledWith();
      expect(stateService.setCategories).toHaveBeenCalledWith(['test']);
    });

    it('Then should call setCategories and repo returns an error', () => {
      spyOn(repoCommerceService, 'getCategories').and.returnValue(
        throwError('Simulated error')
      );
      spyOn(stateService, 'setCategories');

      service.getCategoriesList();

      expect(repoCommerceService.getCategories).toHaveBeenCalledWith();
      expect(stateService.setCategories).not.toHaveBeenCalled();
    });

    it('Then should call getProductList', () => {
      spyOn(repoCommerceService, 'getAll').and.returnValue(
        of([{ id: 1 } as Product])
      );
      spyOn(stateService, 'setProducts');

      service.getProductList();

      expect(repoCommerceService.getAll).toHaveBeenCalledWith();
      expect(stateService.setProducts).toHaveBeenCalledWith([
        { id: 1 } as Product,
      ]);
    });

    it('Then should call getProductList and repo returns an error', () => {
      spyOn(repoCommerceService, 'getAll').and.returnValue(
        throwError('Simulated error')
      );
      spyOn(stateService, 'setProducts');

      service.getProductList();

      expect(repoCommerceService.getAll).toHaveBeenCalledWith();
      expect(stateService.setProducts).not.toHaveBeenCalled();
    });
  });
});
