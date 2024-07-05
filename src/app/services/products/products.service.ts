import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../../interfaces/products';
import { StoreShoppingCart } from '../../store/shopping-cart.store';

const baseUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private http: HttpClient,
    private storeShoppingCart: StoreShoppingCart
  ) {}

  getProducts(): Observable<any> {
    return this.http.get(`${baseUrl}products`);
  }

  getProductsCart(): Observable<any> {
    return this.http.get(`${baseUrl}shopping-cart`);
  }

  postProducts(product: Products): Observable<Products> {
    return this.http.post<Products>(`${baseUrl}shopping-cart`, product);
  }

  putProducts(id: string, product: Products): Observable<Products> {
    return this.http.put<Products>(`${baseUrl}shopping-cart/${id}`, product);
  }

  setCart(product: Products): void {
    this.storeShoppingCart.adicionarProduct(product);
  }

  removeCart(name: string): void {
    this.storeShoppingCart.removeProduct(name);
  }

  getCart(): Observable<Products[]> {
    return this.storeShoppingCart.getShoppingCart();
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}shopping-cart/${id}`);
  }
}
