import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Product } from '../model/product.model';
import { RepoCommerceService } from './repo.commerce.service';

describe('Given the class RepoCommerceService', () => {
  let service: RepoCommerceService;
  let httpMock: HttpTestingController;
  describe('When i instance his methods', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      service = TestBed.inject(RepoCommerceService);
      httpMock = TestBed.inject(HttpTestingController);
    });
    it('Then should be call getAll', () => {
      const mockProducts = [{}] as unknown as Product[];

      service.getAll().subscribe((products) => {
        expect(products).toEqual(mockProducts);
      });

      const req = httpMock.expectOne('https://fakestoreapi.com/products');
      expect(req.request.method).toBe('GET');
    });
    it('Then should be call getById', () => {
      const mockProduct = {} as unknown as Product;

      service.getById('1').subscribe((product) => {
        expect(product).toEqual(mockProduct);
      });

      const req = httpMock.expectOne('https://fakestoreapi.com/products/1');
      expect(req.request.method).toBe('GET');
    });
    it('Then should be call getSections', () => {
      const mockSections = [] as unknown as string[];

      service.getSections().subscribe((products) => {
        expect(products).toEqual(mockSections);
      });

      const req = httpMock.expectOne(
        'https://fakestoreapi.com/products/categories'
      );
      expect(req.request.method).toBe('GET');
    });
    it('Then should be call getSection', () => {
      const mockProducts = [{}] as unknown as Product[];

      service.getSection('jewelery').subscribe((products) => {
        expect(products).toEqual(mockProducts);
      });

      const req = httpMock.expectOne(
        'https://fakestoreapi.com/products/jewelery'
      );
      expect(req.request.method).toBe('GET');
    });
  });
});
