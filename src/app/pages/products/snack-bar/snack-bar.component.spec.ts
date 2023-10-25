import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackBarComponent } from './snack-bar.component';

class MockSnackBarRef {}

describe('Given the class SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;
  describe('When i instance it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SnackBarComponent],
        imports: [MatSelectModule, BrowserAnimationsModule, MatSnackBarModule],
        providers: [{ provide: MatSnackBarRef, useClass: MockSnackBarRef }],
      });
      fixture = TestBed.createComponent(SnackBarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Then the component should be created', () => {
      expect(component).toBeTruthy();
    });
  });
});
