import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserNoId } from 'src/app/model/user.model';
import { RepoUserService } from 'src/app/services/repo.user.service';

@Component({
  selector: 'e-commerce-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  @Output()
  registerForm: FormGroup;
  errorMessage: string | null;
  stateRegister: 'loading' | 'loaded' = 'loaded';

  constructor(
    private fb: FormBuilder,
    private repo: RepoUserService,
    private router: Router
  ) {
    this.errorMessage = null;
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      addressStreet: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }

  handleRegister() {
    this.stateRegister = 'loading';
    this.errorMessage = null;
    const data: UserNoId = {
      ...this.registerForm.value,
      purchaseHistory: [],
    };

    this.repo.register(data).subscribe({
      next: () => {
        this.stateRegister = 'loaded';
        this.errorMessage = null;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }
}
