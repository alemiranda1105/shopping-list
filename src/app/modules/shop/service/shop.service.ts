import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  productLists: Product[];

  constructor() {
    this.productLists = [];
    for(let i = 0; i <= 10; i++) {
      this.productLists.push(
        {
          id: `${i}`,
          name: `Product ${i}`,
          quantity: i,
          supermarket: `Supermarket ${i}`,
          notes: `Note ${i}`
        }
      )
    }
  }

  getAllProducts(): Observable<Product[]> {
    return of(this.productLists);
  }

  getProductById(id: string): Observable<Product> {
    console.log(id);
    const product = this.productLists.filter(p => p.id === id)[0];
    return of(product);
  }

}
