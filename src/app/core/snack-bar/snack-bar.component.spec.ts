import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackBarComponent } from './snack-bar.component';

describe('Given the class SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnackBarComponent],
      imports: [MatSelectModule, BrowserAnimationsModule, MatSnackBarModule],
      providers: [
        {
          provide: MatSnackBarRef,
          useValue: {
            containerInstance: { snackBarConfig: { data: 'Test data' } },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(SnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Then the component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Then the snackBar data should be set', () => {
    expect(component.snackBarRef.containerInstance.snackBarConfig.data).toBe(
      'Test data'
    );
  });
});
