/* eslint-disable @typescript-eslint/no-unused-vars */
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
      email: ['', [Validators.required]],
      age: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      addressStreet: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      title: ['', [Validators.required]],
      isAcceptingCommunications: ['', [Validators.required]],
    });
  }

  handleRegister() {
    if (!this.registerForm.valid) {
      this.errorMessage = 'Please enter the data correctly.';
      return;
    }

    const data: UserNoId = {
      ...this.registerForm.value,
    };
    data.age = data.age.toString();

    this.repo.register(data).subscribe({
      next: (_response) => {
        this.errorMessage = null;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }
}
