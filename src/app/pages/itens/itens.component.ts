import { Component, OnInit } from '@angular/core';
import { Products } from '../../interfaces/products';
import { ProductsService } from '../../services/products/products.service';
import { Observable } from 'rxjs';
import { BuyTable } from '../../interfaces/buy-table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.css'
})
export class ItensComponent implements OnInit {
  productsCart$: Observable<Products[]>;
  buyTable: BuyTable[] = [];
  total: number = 0;

  constructor(
    private _productsService: ProductsService
  ) {}

  ngOnInit(): void {
      this.getProductsCart();
  }

  getProductsCart() {
    this._productsService.getProductsCart().subscribe((response) => {
      this.buyTable = response;
      this.buyTable.forEach((item) => {
        this.total += (item.subtotal);
      })
    });
  }

  removeItem(id: string, name: string) {
    this._productsService.deleteProduct(id).subscribe({
      error: err => console.error('Ocorreu erro :', err),
      complete: () => {
        this._productsService.removeCart(name);
        this.buyTable.forEach((item, index) => {
          if (item.id === id) {
            this.total -= item.subtotal;
            this.buyTable.splice(index, 1);
          }
        });
        Swal.fire({
          title: "Item",
          text: 'Removido com sucesso!',
          icon: "success",
        });
      }
    });
  }

}
