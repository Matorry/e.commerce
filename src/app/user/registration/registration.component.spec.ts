/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { RepoUserService } from 'src/app/services/repo.user.service';
import { LoginComponent } from '../login/login.component';
import { UserModule } from '../user.module';
import { RegistrationComponent } from './registration.component';

describe('Given the class RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let repo: RepoUserService;
  describe('When we instance it', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [RegistrationComponent],
        providers: [RepoUserService, UserModule],
        imports: [
          HttpClientModule,
          CommonModule,
          ReactiveFormsModule,
          RouterTestingModule.withRoutes([
            { path: 'login', component: LoginComponent },
          ]),
          MatButtonModule,
          MatFormFieldModule,
          MatInputModule,
          BrowserAnimationsModule,
        ],
      });
      fixture = TestBed.createComponent(RegistrationComponent);
      component = fixture.componentInstance;
      repo = TestBed.inject(RepoUserService);
      fixture.detectChanges();
    });
    it('Then, should create', () => {
      expect(component).toBeTruthy();
    });
    it('Then, it should call the RepoUserService service and use the login method to register.', () => {
      const mockLogedUser = {} as unknown as User;

      component.registerForm.setValue({
        userName: 'test',
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        password: 'test',
        addressStreet: 'test',
        postalCode: 'test',
        city: 'test',
      });
      component.registerForm.updateValueAndValidity();
      const spyRepo = spyOn(repo, 'register').and.returnValue(
        of(mockLogedUser)
      );

      component.handleRegister();
      expect(spyRepo).toHaveBeenCalled();
    });
    it('Then, it should receive an error from the user.', () => {
      const spyRepo = spyOn(repo, 'login');

      component.handleRegister();
      expect(spyRepo).not.toHaveBeenCalled();
    });
    it('Then, it should receive an error from the repository.', () => {
      component.registerForm.setValue({
        userName: 'test',
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        password: 'test',
        addressStreet: 'test',
        postalCode: 'test',
        city: 'test',
      });
      component.registerForm.updateValueAndValidity();
      const error = () => new Error('Error de inicio de registro');
      const spyRepo = spyOn(repo, 'register').and.returnValue(
        throwError(error)
      );

      component.handleRegister();
      expect(spyRepo).toHaveBeenCalled();
      expect(
        component.registerForm.controls['password'].hasError('incorrect')
      ).toBeFalse();
      expect(component.errorMessage).toBe('Error de inicio de registro');
    });
  });
});
