import {Router} from "@angular/router";
import {Component, OnInit} from '@angular/core';
import {StorageKeys} from "../../../shared/enums/storageKeys";
import {Products} from "../../../shared/products/product-items";
import {StorageService} from "../../../services/localstorage-service/storage.service";
import {Product} from "../../../shared/interfaces/product";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  public quantity: number;
  public products = Products;
  public productsToOrder: Product[];

  constructor(private readonly storageService: StorageService, private readonly router: Router) {
    this.quantity = this.storageService.getItem(StorageKeys.Quantity);
    this.productsToOrder = this.storageService.getItem(StorageKeys.Product) || [];
  }

  ngOnInit(): void {
  }

  public addQuantity(product: Product): void {
    ++product.quantity;
    this.calculateProductsQuantity();
  }

  public subtractQuantity(product: Product): void {
    if (product.quantity >= 1) {
      --product.quantity;
      this.calculateProductsQuantity();
    }
  }

  private calculateProductsQuantity(): void {
    let newQuantity = 0;
    this.products.forEach((product: Product) => {
      newQuantity += product.quantity;
    })
    this.quantity = newQuantity;
  }

  public addToCart(products: Product[]): void {
    this.storageService.setItem(StorageKeys.Product, products)
    this.storageService.setItem(StorageKeys.Quantity, this.quantity)
    this.router.navigateByUrl('checkout');
  }

}
