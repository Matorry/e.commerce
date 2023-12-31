/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { LogedUser, User } from 'src/app/model/user.model';
import { ProductListComponent } from 'src/app/pages/products/product.list/product.list.component';
import { RepoUserService } from 'src/app/services/repo.user.service';
import { UserModule } from '../user.module';
import { LoginComponent } from './login.component';

describe('Given the class LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let repo: RepoUserService;
  describe('When the component is instantiated', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [RepoUserService, UserModule],
        imports: [
          HttpClientModule,
          CommonModule,
          MatSnackBarModule,
          ReactiveFormsModule,
          RouterTestingModule.withRoutes([
            { path: 'products', component: ProductListComponent },
          ]),
          MatButtonModule,
          MatFormFieldModule,
          MatInputModule,
          BrowserAnimationsModule,
        ],
      });
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      repo = TestBed.inject(RepoUserService);
      fixture.detectChanges();
    });
    it('Then, should create', () => {
      expect(component).toBeTruthy();
    });
    it('Then, it should call the RepoUserService service and use the login method to log in.', () => {
      const mockLogedUser: LogedUser = {
        user: {} as unknown as User,
        token: '',
      };
      component.loginForm.setValue({ userName: 'test', password: 'test' });
      component.loginForm.updateValueAndValidity();
      const spyRepo = spyOn(repo, 'login').and.returnValue(of(mockLogedUser));

      component.handleSubmit();
      expect(spyRepo).toHaveBeenCalled();
    });
    it('Then, it should receive an error from the repository.', () => {
      component.loginForm.setValue({ userName: 'test', password: 'test' });
      component.loginForm.updateValueAndValidity();
      const error = () => new Error('Error de inicio de sesión');
      const spyRepo = spyOn(repo, 'login').and.returnValue(throwError(error));

      component.handleSubmit();
      expect(spyRepo).toHaveBeenCalled();
      expect(
        component.loginForm.controls['password'].hasError('incorrect')
      ).toBeFalse();
      expect(component.errorMessage).toBe('Error de inicio de sesión');
    });
  });
});
