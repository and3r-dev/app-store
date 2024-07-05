import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../../interfaces/products';

const baseUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(`${baseUrl}products`);
  }

  postProducts(product: Products): Observable<Products> {
    return this.http.post<Products>(`${baseUrl}shopping-cart`, product);
  }
}
