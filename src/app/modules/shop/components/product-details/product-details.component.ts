import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/interfaces/Product';
import { ShopService } from '../../service/shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product

  constructor(
    private activatdRoute: ActivatedRoute,
    private router: Router,
    private shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.activatdRoute.params
    .pipe(
      switchMap( ({id}) => this.shopService.getProductById(id) )
    )
    .subscribe(product => this.product = product)
  }

}
