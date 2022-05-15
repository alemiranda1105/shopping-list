import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { ShopRoutingModule } from './shop-routing.module';
import { MaterialModule } from '../material/material.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MapPipe } from './pipes/map.pipe';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ShopListComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    MapPipe,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class ShopModule { }
