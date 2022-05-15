import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewProduct, Product } from 'src/app/interfaces/Product';

import { Firestore, DocumentData } from '@angular/fire/firestore';
import { collection, CollectionReference, doc, DocumentReference, getDoc, getDocs, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  productLists: Product[] = [];
  db: CollectionReference<DocumentData>;

  constructor(
    private firestore: Firestore
  ) {
    this.db = collection(this.firestore, 'products')
  }

  getAllProducts(): Observable<Product[]> {
    this.productLists = []
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

  async getProductById(id: string): Promise<Product> {
    const docRef = doc(this.firestore, 'products', id)
    const docData = await getDoc(docRef)
    let product: Product = Object.assign({id: id}, docData.data() as Product)
    return product;
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
