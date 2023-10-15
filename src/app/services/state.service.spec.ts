import { TestBed } from '@angular/core/testing';
import { Product } from '../model/product.model';
import { LogedUser } from '../model/user.model';
import { StateService } from './state.service';

describe('Given the class StateService', () => {
  let service: StateService;

  describe('When I access its methods', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(StateService);
    });

    it('Then should initialize state with default values', () => {
      let initialStateProducts: Product[] = [];
      let initialStateCategories: string[] = [];

      service.getProducts().subscribe((res) => (initialStateProducts = res));
      service
        .getCategories()
        .subscribe((res) => (initialStateCategories = res));

      expect(initialStateProducts).toBeDefined();
      expect(initialStateCategories).toBeDefined();

      expect(initialStateProducts).toEqual([] as Product[]);
      expect(initialStateCategories).toEqual([] as string[]);
    });

    it('Then should return the products', () => {
      const products = [] as unknown as Product[];
      service.getProducts().subscribe((res) => expect(res).toEqual(products));
    });

    it('Then should set and return the products', () => {
      const products = [{ id: '1' }] as unknown as Product[];
      service.setProducts(products);
      service.getProducts().subscribe((res) => expect(res).toEqual(products));
    });

    it('Then should return the categories', () => {
      const categories = [] as unknown as string[];
      service
        .getCategories()
        .subscribe((res) => expect(res).toEqual(categories));
    });

    it('Then should set and return the categories', () => {
      const categories = [{ id: '1' }] as unknown as string[];
      service.setCategories(categories);
      service
        .getCategories()
        .subscribe((res) => expect(res).toEqual(categories));
    });

    it('Then should return the cart', () => {
      const cart = [] as unknown as Product[];
      service.getCart().subscribe((res) => expect(res).toEqual(cart));
    });

    it('Then should set and return the cart', () => {
      const cart = [] as unknown as Product[];
      service.setCart(cart);
      service.getCart().subscribe((res) => expect(res).toEqual(cart));
    });

    it('Then should return the user', () => {
      const user = {} as unknown as LogedUser;
      service.getUser().subscribe((res) => expect(res).toEqual(user));
    });

    it('Then should set and return the user', () => {
      const user = {} as unknown as LogedUser;
      service.setUser(user);
      service.getUser().subscribe((res) => expect(res).toEqual(user));
    });
  });
});
