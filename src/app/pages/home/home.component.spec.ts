import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { RepoCommerceService } from 'src/app/services/repo.commerce.service';
import { StateService } from 'src/app/services/state.service';
import { HomeComponent } from './home.component';

describe('Given the class HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let stateService: StateService;
  let repo: RepoCommerceService;
  describe('When the component is instantiated', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent],
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          MatSnackBarModule,
          BrowserAnimationsModule,
        ],
        providers: [StateService, ProductService, RepoCommerceService],
      });
      fixture = TestBed.createComponent(HomeComponent);
      stateService = TestBed.inject(StateService);
      repo = TestBed.inject(RepoCommerceService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Then the component should be created', () => {
      expect(component).toBeTruthy();
    });
    it('Then the getCategoryClass must return women', () => {
      const test = component.getCategoryClass("women's clothing");
      expect(test).toEqual('women');
    });
    it('Then sould call filterProducts', () => {
      spyOn(stateService, 'setCurrentCategory');
      spyOn(stateService, 'setProducts');
      spyOn(repo, 'getCategoryProducts').and.returnValue(
        of([{} as unknown as Product])
      );
      component.getCategory('');
      expect(stateService.setCurrentCategory).toHaveBeenCalled();
      expect(stateService.setProducts).toHaveBeenCalled();
    });

    it('Then i call changeCategory', () => {
      spyOn(stateService, 'setCurrentCategory');

      component.changeCategory('');

      expect(stateService.setCurrentCategory).toHaveBeenCalledWith('');
    });
  });
});
