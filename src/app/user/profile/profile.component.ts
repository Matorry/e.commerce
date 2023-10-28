import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogedUser, User } from 'src/app/model/user.model';
import { RepoUserService } from 'src/app/services/repo.user.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'e-commerce-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: LogedUser = {} as LogedUser;
  profileForm: FormGroup;
  errorMessage: string | null = null;
  statePatch: 'loading' | 'loaded' = 'loaded';

  constructor(
    private state: StateService,
    private formBuilder: FormBuilder,
    private repo: RepoUserService,
    private router: Router
  ) {
    this.state.getUser().subscribe((resp) => (this.user = resp));

    this.profileForm = this.formBuilder.group({
      firstName: [
        { value: this.user.user.firstName, disabled: true },
        Validators.required,
      ],
      lastName: [
        { value: this.user.user.lastName, disabled: true },
        Validators.required,
      ],
      email: [
        { value: this.user.user.email, disabled: true },
        [Validators.required, Validators.email],
      ],
      addressStreet: [
        { value: this.user.user.addressStreet, disabled: true },
        Validators.required,
      ],
      postalCode: [
        { value: this.user.user.postalCode, disabled: true },
        Validators.required,
      ],
      city: [
        { value: this.user.user.city, disabled: true },
        Validators.required,
      ],
    });
  }

  toggleField(fieldName: string) {
    const control = this.profileForm.get(fieldName);
    if (control) {
      if (control.disabled) {
        control.enable();
      } else {
        control.disable();
      }
    }
  }

  saveChanges() {
    this.statePatch = 'loading';
    const data: Partial<User> = {
      ...this.profileForm.value,
    };
    this.repo.patch(data, this.user.user.id).subscribe({
      next: () => ((this.errorMessage = null), (this.statePatch = 'loaded')),
      error: (error) => (
        (this.errorMessage = error.message), (this.statePatch = 'loaded')
      ),
    });
  }

  deleteAccount() {
    this.statePatch = 'loading';
    this.repo.delete(this.user.user.id).subscribe({
      next: () => ((this.errorMessage = null), (this.statePatch = 'loaded')),
      error: (error) => (
        (this.errorMessage = error.message), (this.statePatch = 'loaded')
      ),
    });
    this.state.logOut();
    this.router.navigate(['home']);
  }

  logOut() {
    this.state.logOut();
    this.router.navigate(['home']);
  }
}
