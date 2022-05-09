import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ProductCardComponent} from './product-card/product-card.component';


@NgModule({
  declarations: [ProductCardComponent], imports: [CommonModule, ProductRoutingModule]
})
export class ProductModule {
}
