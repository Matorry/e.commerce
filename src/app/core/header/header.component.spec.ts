import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { LogedUser } from 'src/app/model/user.model';
import { StateService } from 'src/app/services/state.service';
import { MenuComponent } from '../menu/menu.component';
import { HeaderComponent } from './header.component';

describe('Given the component HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let stateService: StateService;

  describe('When I instantiate it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HeaderComponent, MenuComponent],
        imports: [RouterModule.forRoot([]), HttpClientTestingModule],
        providers: [StateService],
      });
      fixture = TestBed.createComponent(HeaderComponent);
      stateService = TestBed.inject(StateService);
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
  });
});
