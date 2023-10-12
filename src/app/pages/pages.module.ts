import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCardComponent } from './products/product.card/product.card.component';
import { ProductDetailComponent } from './products/product.detail/product.detail.component';
import { ProductListComponent } from './products/product.list/product.list.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    ProductDetailComponent,
  ],
  imports: [CommonModule],
})
export class PagesModule {}
