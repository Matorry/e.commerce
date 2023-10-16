import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from 'src/app/services/product.service';
import { RepoCommerceService } from 'src/app/services/repo.commerce.service';
import { StateService } from 'src/app/services/state.service';
import { HomeComponent } from './home.component';

describe('Given the class HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  describe('When I instantiate it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [StateService, ProductService, RepoCommerceService],
      });
      fixture = TestBed.createComponent(HomeComponent);
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
  });
});
