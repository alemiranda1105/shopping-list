import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewProduct, Product } from 'src/app/interfaces/Product';

import { Firestore, DocumentData } from '@angular/fire/firestore';
import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentReference, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  userId: string;

  productLists: Product[] = [];
  db: CollectionReference<DocumentData>;

  constructor(
    private firestore: Firestore,
    private readonly authService: AuthService
  ) {
    this.db = collection(this.firestore, 'products')
    this.userId = this.authService.getCurrentUser()
  }

  getAllProducts(): Observable<Product[]> {
    this.authService.getCurrentUser();
    this.productLists = []
    let q = query(this.db, where('user_id', '==', this.userId))
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

  async createProduct(product: NewProduct): Promise<Product> {
    product.user_id = this.userId
    let created = await addDoc(this.db, product)
    let newProduct: Product = Object.assign(await this.getProductById(created.id))
    return newProduct
  }

  async updateProduct(product: Product): Promise<Product> {
    const toUpdate = doc(this.firestore, 'products', product.id)
    await updateDoc(toUpdate, {...product})
    .catch((err: {message: any}) => {
      alert(err.message)
    })
    let newProduct: Product = Object.assign(await this.getProductById(product.id))
    return newProduct
  }

  deleteProduct(id: string): Observable<boolean> {
    const dataToDelete = doc(this.firestore, 'products', id)
    deleteDoc(dataToDelete)
    .catch((err: {message: any}) => {
      alert(err.message)
    })
    this.productLists = this.productLists.filter(p => p.id !== id)
    return of(true)
  }

}
