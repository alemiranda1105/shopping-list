import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewProduct, Product } from 'src/app/interfaces/Product';

import { Firestore } from '@angular/fire/firestore';
import { collection, CollectionReference, getDoc, getDocs, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  productLists: Product[] = [];
  db: CollectionReference<import("@angular/fire/firestore").DocumentData>;

  constructor(
    private firestore: Firestore
  ) {
    this.db = collection(this.firestore, 'products')
  }
  getAllProducts() {
    let q = query(this.db, where('user_id', '==', '1'))
    getDocs(q)
    .then(docs => {
      docs.forEach(d => {
        let product = {...d.data(), id: d.id} as Product
        this.productLists.push(product)
      })
    })
    return of(this.productLists)
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
