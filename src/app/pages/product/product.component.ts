import { Component, Input } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  @Input() product: any;

  constructor(
    private _productsService: ProductsService
  ) {}

  adicionar() {
    console.log(this.product);
    this._productsService.postProducts(this.product).subscribe({
      // next: x => console.log('The next value is: ', x),
      error: err => console.error('Ocorreu erro :', err),
      complete: () => console.log('finalizado com sucesso.')
    });
  }

}
