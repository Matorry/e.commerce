import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MenuComponent } from './menu.component';

describe('Given the class MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  describe('When the component is instantiated', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MenuComponent],
      });
      fixture = TestBed.createComponent(MenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Then, should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
