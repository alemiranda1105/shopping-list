import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product?: Product
  @Output() deleteProductEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteProduct() {
    if(this.product) {
      this.deleteProductEvent.emit(this.product.id)
    }
  }

}
