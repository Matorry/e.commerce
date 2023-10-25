import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackBarComponent } from './snack-bar.component';

class MockSnackBarRef {}

describe('SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnackBarComponent],
      imports: [MatSelectModule, BrowserAnimationsModule, MatSnackBarModule],
      providers: [
        { provide: MatSnackBarRef, useClass: MockSnackBarRef }, // Use the mock implementation
      ],
    });
    fixture = TestBed.createComponent(SnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
