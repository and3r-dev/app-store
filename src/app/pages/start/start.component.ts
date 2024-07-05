import { Component, OnInit } from '@angular/core';
import { Products } from '../../interfaces/products';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {

  products!: Products[];

  constructor(
    private _productsService: ProductsService
  )  {}

  ngOnInit(): void {
    this.indexProducts();
  }

  indexProducts() {
    this._productsService.getProducts().subscribe((response) => {
      this.products = response;
    });
  }

}
