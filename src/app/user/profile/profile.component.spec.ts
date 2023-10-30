/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { RepoUserService } from 'src/app/services/repo.user.service';
import { StateService } from 'src/app/services/state.service';
import { PurchaseHistoryComponent } from '../purchase-history/purchase-history.component';
import { ProfileComponent } from './profile.component';

describe('Given the class ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let repo: RepoUserService;
  let state: StateService;
  let router: Router;
  describe('When the component is instantiated', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProfileComponent, PurchaseHistoryComponent],
        imports: [
          MatIconModule,
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([
            { path: 'home', component: HomeComponent },
          ]),
          MatButtonModule,
          MatFormFieldModule,
          MatInputModule,
          BrowserAnimationsModule,
          ReactiveFormsModule,
          MatCardModule,
          MatSnackBarModule,
        ],
        providers: [
          {
            provide: StateService,
            useValue: {
              getUser: () =>
                of({ user: { firstName: 'Test', purchaseHistory: [{}, {}] } }),
              logOut: () => {},
            },
          },
        ],
      });

      fixture = TestBed.createComponent(ProfileComponent);
      component = fixture.componentInstance;
      repo = TestBed.inject(RepoUserService);
      state = TestBed.inject(StateService);
      router = TestBed.inject(Router);
      fixture.detectChanges();
    });

    it('Then, should create ProfileComponent', () => {
      expect(component).toBeTruthy();
    });

    it('Then, should toggle firstName field', () => {
      component.profileForm.controls['firstName'].disable();
      component.toggleField('firstName');
      expect(component.profileForm.controls['firstName'].enabled).toBeTrue();
    });

    it('Then, should toggle lastName field', () => {
      component.profileForm.controls['lastName'].enable();
      component.toggleField('lastName');
      expect(component.profileForm.controls['lastName'].enabled).toBeFalse();
    });

    it('Then, should save changes successfully', () => {
      const mockData = {
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.com',
        addressStreet: 'test',
        postalCode: 'test',
        city: 'test',
      } as User;
      spyOn(repo, 'patch').and.returnValue(of(mockData));
      component.profileForm.setValue(mockData);
      component.saveChanges();

      expect(repo.patch).toHaveBeenCalledWith(mockData, component.user.user.id);
      expect(component.errorMessage).toBeNull();
    });

    it('Then, should handle save changes error', () => {
      const mockData = {
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.com',
        addressStreet: 'test',
        postalCode: 'test',
        city: 'test',
      } as User;
      component.profileForm.setValue(mockData);
      const error = () => new Error('Error');
      spyOn(repo, 'patch').and.returnValue(throwError(error));
      component.saveChanges();

      expect(repo.patch).toHaveBeenCalledWith(mockData, component.user.user.id);
      expect(component.errorMessage).not.toBeNull();
    });

    it('Then, should delete account successfully', () => {
      spyOn(repo, 'delete').and.returnValue(of(undefined));
      component.deleteAccount();

      expect(repo.delete).toHaveBeenCalledWith(component.user.user.id);
      expect(component.errorMessage).toBeNull();
    });

    it('Then, should handle delete account error', () => {
      const error = () => new Error('Error');
      spyOn(repo, 'delete').and.returnValue(throwError(error));
      component.deleteAccount();

      expect(repo.delete).toHaveBeenCalledWith(component.user.user.id);
      expect(component.errorMessage).not.toBeNull();
    });

    it('Then, should log out and navigate to home', () => {
      spyOn(state, 'logOut');
      spyOn(router, 'navigate');
      component.logOut();

      expect(state.logOut).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['home']);
    });
  });
});
