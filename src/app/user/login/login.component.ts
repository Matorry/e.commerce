import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/model/user.model';
import { RepoUserService } from 'src/app/services/repo.user.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'e-commerce-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  stateLogin: 'loading' | 'loaded' = 'loaded';

  constructor(
    private fb: FormBuilder,
    private repo: RepoUserService,
    private router: Router,
    private state: StateService
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  handleSubmit() {
    this.stateLogin = 'loading';
    this.errorMessage = null;
    const data: LoginData = {
      ...this.loginForm.value,
    };
    this.repo.login(data).subscribe({
      next: (response) => {
        this.stateLogin = 'loaded';
        this.state.setUser(response);
        this.errorMessage = null;
        this.router.navigate(['products']);
      },
      error: (error) => {
        this.stateLogin = 'loaded';
        this.errorMessage = error.message;
      },
    });
  }
}
