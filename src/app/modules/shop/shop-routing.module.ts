import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopPageComponent } from 'src/app/pages/shop-page/shop-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';

const routes: Routes = [
    {
        path: '',
        component: ShopPageComponent,
        children: [
            {
                path: 'list',
                component: ShopListComponent
            },
            {
                path: 'details/:id',
                component: ProductDetailsComponent
            },
            {
                path: 'edit/:id',
                component: ProductFormComponent
            },
            {
                path: 'create',
                component: ProductFormComponent
            },
            {
                path: '**',
                redirectTo: 'list'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
