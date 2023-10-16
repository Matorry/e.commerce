import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductCardComponent } from './products/product.card/product.card.component';
import { ProductDetailComponent } from './products/product.detail/product.detail.component';
import { ProductListComponent } from './products/product.list/product.list.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    ProductDetailComponent,
    HomeComponent,
    CartComponent,
  ],
  imports: [CommonModule, RouterModule, MatSelectModule],
  exports: [ProductListComponent, ProductCardComponent],
})
export class PagesModule {}
