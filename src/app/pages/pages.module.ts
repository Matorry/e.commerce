import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from './products/product.card/product.card.component';
import { ProductDetailComponent } from './products/product.detail/product.detail.component';
import { ProductListComponent } from './products/product.list/product.list.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    ProductDetailComponent,
    HomeComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [ProductListComponent, ProductCardComponent],
})
export class PagesModule {}
