import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Products } from '../interfaces/products';

export interface State {
  products: Products[];
  countProducts: number;
}

const initialState: State = {
  products: [],
  countProducts: 0
};

export class StoreShoppingCart {
  private subject = new BehaviorSubject<State>(initialState);
  private store = this.subject.asObservable();

  get state(): State {
    return this.subject.value;
  }

  getShoppingCart(): Observable<Products[]> {
    return this.store.pipe(
      map((state) => state.products)
    );
  }

  adicionarProduct(product: Products): void {
    const newState: State = {
      ...this.state,
      products: [...this.state.products, product],
      countProducts: [...this.state.products, product].length
    };
    this.subject.next(newState);
  }

  removeProduct(name: string): void {
    const newState: State = {
      ...this.state,
      products: this.state.products.filter((c) => c.name !== name),
      countProducts: this.state.products.filter((c) => c.name !== name).length
    };
    this.subject.next(newState);
  }
}
