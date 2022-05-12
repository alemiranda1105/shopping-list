import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewProduct, Product } from 'src/app/interfaces/Product';

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
    const product = this.productLists.filter(p => p.id === id)[0];
    return of(product);
  }

  createProduct(product: NewProduct): Observable<Product> {
    let newProduct: Product = {
      id: this.productLists.length + "",
      ...product
    }
    this.productLists.push(newProduct)
    return of(newProduct)
  }

  updateProduct(product: Product): Observable<Product> {
     this.productLists = this.productLists.filter(p => p.id !== product.id)
     this.productLists.push(product)
     this.productLists.sort((a,b) => {
       if(a.id < b.id) return -1
       if(a.id > b.id) return 1
       return 0
     })
     return of(product)
  }

  deleteProduct(id: string): Observable<boolean> {
    this.productLists = this.productLists.filter(p => p.id !== id)
    return of(true)
  }

}
