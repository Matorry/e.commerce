import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { User } from 'src/app/model/user.model';
import { ProductService } from 'src/app/services/product.service';
import { RepoUserService } from 'src/app/services/repo.user.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'e-commerce-payment.page',
  templateUrl: './payment.page.component.html',
  styleUrls: ['./payment.page.component.scss'],
})
export class PaymentPageComponent {
  products: Product[] = [];
  paymentForm: FormGroup;
  user: User = {} as User;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private state: StateService,
    private repo: RepoUserService,
    private router: Router
  ) {
    this.state.getUser().subscribe((resp) => {
      this.user = resp.user;
    });

    this.state.getCart().subscribe((resp) => (this.products = resp));

    this.paymentForm = this.fb.group({
      creditCardNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{16}$/)],
      ],
      expirationDate: [
        '',
        [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)],
      ],
      securityCode: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });
  }

  getTotalPrice(products: Product[]) {
    return this.service.getTotalPrice(products);
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${day}-${month}-${year}`;
      if (this.user.purchaseHistory) {
        this.user.purchaseHistory.push({
          products: this.products,
          date: formattedDate,
          amount: this.getTotalPrice(this.products).toString(),
          isOpen: false,
        });
      } else {
        this.user.purchaseHistory = [
          {
            products: this.products,
            date: formattedDate,
            amount: this.getTotalPrice(this.products).toString(),
            isOpen: false,
          },
        ];
      }

      this.repo.patch(this.user, this.user.id).subscribe({
        next: () => (
          (this.errorMessage = null), this.router.navigate(['/user/profile'])
        ),
        error: (error) => (this.errorMessage = error.message),
      });

      this.service.clearCart();
    }
  }
}
