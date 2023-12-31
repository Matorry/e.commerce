import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('Given the component FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  describe('When the component is instantiated', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [FooterComponent],
      });
      fixture = TestBed.createComponent(FooterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Then the component should be created', () => {
      expect(component).toBeTruthy();
    });
  });
});
