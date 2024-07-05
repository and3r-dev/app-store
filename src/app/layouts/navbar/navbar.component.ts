import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Products } from '../../interfaces/products';
import { ProductsService } from '../../services/products/products.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  productCart$: Observable<Products[]>;
  products: Products[];
  productCount: number = 0;

  private subscription: Subscription;

  @ViewChild('countElement') countElement: ElementRef;

  constructor(private _productsService: ProductsService) {}

  ngOnInit(): void {
    this.subscription = this._productsService.getCart().subscribe(products => {
      this.productCount = products.length;
      this.updateDataCountAttribute();
    });

    if (this.productCount == 0) {
      this.getProductsCart();
    }
  }

  ngAfterViewInit() {
    this.updateDataCountAttribute();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateDataCountAttribute() {
    if (this.countElement) {
      this.countElement.nativeElement.setAttribute('data-count', this.productCount.toString());
    }
  }

  getProductsCart() {
    this._productsService.getProductsCart().subscribe((response) => {
      this.products = response;
      this.productCount = this.products.length;
    });
  }
}
