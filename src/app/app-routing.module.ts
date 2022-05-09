import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./shared/guards/auth.guard";
import {CartGuard} from "./shared/guards/cart.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    loadChildren: () => import('./modules/product/product.module').then((m) => m.ProductModule),
    canActivate: [CartGuard]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./modules/checkout/checkout.module').then((m) => m.CheckoutModule),
    canActivate: [CartGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
