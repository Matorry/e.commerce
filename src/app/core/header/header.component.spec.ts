import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { LogedUser } from 'src/app/model/user.model';
import { ProductService } from 'src/app/services/product.service';
import { StateService } from 'src/app/services/state.service';
import { MenuComponent } from '../menu/menu.component';
import { HeaderComponent } from './header.component';

describe('Given the component HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let stateService: StateService;
  let service: ProductService;

  describe('When I instantiate it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HeaderComponent, MenuComponent],
        imports: [
          RouterModule.forRoot([]),
          HttpClientTestingModule,
          MatIconModule,
          MatTabsModule,
        ],
        providers: [StateService],
      });
      fixture = TestBed.createComponent(HeaderComponent);
      stateService = TestBed.inject(StateService);
      service = TestBed.inject(ProductService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Then the component should be created', () => {
      expect(component).toBeTruthy();
      expect(component.isUserLoggedIn).toEqual(false);
    });

    it('Then the state change', () => {
      stateService.setUser({ token: '1' } as unknown as LogedUser);
      expect(component).toBeTruthy();
      expect(component.isUserLoggedIn).toEqual(true);
    });

    it('Then i call getCategory', () => {
      spyOn(service, 'getCategoryProducts');

      component.getCategory('');

      expect(service.getCategoryProducts).toHaveBeenCalledWith('');
    });
  });
});
