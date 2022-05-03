import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { ShopRoutingModule } from './shop-routing.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ShopListComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    MaterialModule
  ]
})
export class ShopModule { }
