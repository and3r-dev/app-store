import { Component, Input } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { BuyTable } from '../../interfaces/buy-table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  productsCart: BuyTable[] = [];
  countProducts: number = 0;

  @Input() product: any;

  constructor(
    private _productsService: ProductsService,
    private toastr: ToastrService
  ) { }

  adicionar() {
    let updatedItem = false;
    this.productsCart.forEach((item) => {
      if (item.id === this.product.id && !updatedItem) {
        item.amount += 1;
        item.subtotal = item.amount * item.price;
        updatedItem = true;
        this.putShoppingCart(item);
        return;
      }
    });

    if (!updatedItem)
      this.postShoppingCart();
  }

  getProductsCart() {
    this._productsService.getProductsCart().subscribe((response) => {
      this.productsCart = response;
      this.countProducts = this.productsCart.length;
    });
  }

  postShoppingCart() {
    this.product.amount = 1;
    this.product.subtotal = parseInt(this.product.price);
    this._productsService.postProducts(this.product).subscribe({
      error: err => console.error('Ocorreu erro :', err),
      complete: () => {
        this._productsService.setCart(this.product);
        this.productsCart.push(this.product);
        this.countProducts++;
        this.toastr.success('Adicionado ao carrinho!', 'Novo Item.');
      }
    });
  }

  putShoppingCart(item: BuyTable) {
    this._productsService.putProducts(item.id, item).subscribe((response) => {
      this.toastr.success('Adicionado ao carrinho!', `Item com ${item.amount} unidades.`);
    });
  }
}
