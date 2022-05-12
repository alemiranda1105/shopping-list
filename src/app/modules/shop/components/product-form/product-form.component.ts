import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/interfaces/Product';
import { ShopService } from '../../service/shop.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product?: Product
  newProduct: boolean = true

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
        this.newProduct = false;
        this.productForm.controls['name'].setValue(product.name);
        this.productForm.controls['notes'].setValue(product.notes);
        this.productForm.controls['quantity'].setValue(product.quantity);
        this.productForm.controls['supermarket'].setValue(product.supermarket);
      });
    } else {
      this.newProduct = true;
    }  
  }

  onSubmit(): void {

  }

}
