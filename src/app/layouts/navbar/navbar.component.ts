import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Products } from '../../interfaces/products';
import { ProductsService } from '../../services/products/products.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  productCart$: Observable<Products[]>;
  products: Products[];
  productCount: number = 0;

  private subscription: Subscription;

  @ViewChild('countElement') countElement: ElementRef;

  constructor(private _productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProductsCart();
    this.subscription = this._productsService.getCart().subscribe(products => {
      this.productCount = this.productCount > products.length ? this.productCount + products.length : products.length;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProductsCart() {
    this._productsService.getProductsCart().subscribe((response) => {
      this.products = response;
      this.productCount = this.products.length;
    });
  }
}
