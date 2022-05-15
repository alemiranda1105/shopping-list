import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { NewProduct, Product } from 'src/app/interfaces/Product';
import { ShopService } from '../../service/shop.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product?: Product
  newProduct?: NewProduct

  isNew: boolean = true

  productForm: FormGroup

  constructor(
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService,
    private router: Router
  ) { 
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      notes: new FormControl('', [Validators.minLength(5), Validators.maxLength(200)]),
      quantity: new FormControl(0, [Validators.min(0), Validators.max(99), Validators.required]),
      supermarket: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    if(this.router.url.includes('edit')) {
      this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.shopService.getProductById(id) )
      )
      .subscribe(product => {
        if(!product) {
          this.router.navigate(['/']);
        }
        this.product = product;
        this.isNew = false;
        this.productForm.controls['name'].setValue(product.name);
        this.productForm.controls['notes'].setValue(product.notes);
        this.productForm.controls['quantity'].setValue(product.quantity);
        this.productForm.controls['supermarket'].setValue(product.supermarket);
      });
    } else {
      this.isNew = true;
    }  
  }

  onSubmit(): void {
    var invalid = []
    const controls = this.productForm.controls
    for(let name in controls) {
      if(controls[name].invalid) {
        invalid.push(name)
      }
    }
    if(invalid.length === 0) {
      if(this.isNew) {
        this.newProduct = {
          ...this.productForm.value
        }

        this.shopService.createProduct(this.newProduct!)
        .then(res => {
          if(res.id) {
            this.router.navigate(['/edit', {id: res.id}])
          } else {
            this.router.navigate(['/'])
          }
          
        })
      } else {
        this.product = {
          ...this.product,
          ...this.productForm.value
        }
        
        this.shopService.updateProduct(this.product!)
        .subscribe(res => {
          if(res.id) {
            this.router.navigate(['/edit', {id: res.id}])
          } else {
            this.router.navigate(['/'])
          }
        })
      }
    }
  }

}
