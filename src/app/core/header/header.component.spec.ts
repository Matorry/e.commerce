import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('Given the component HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  describe('When I instantiate it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HeaderComponent],
      });
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Then the component should be created', () => {
      expect(component).toBeTruthy();
    });
  });
});
