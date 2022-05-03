import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { ShopService } from '../../service/shop.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  productList: Product[] = [];

  constructor(
    private shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.shopService.getAllProducts()
    .subscribe(res => this.productList = res);
  }

}
