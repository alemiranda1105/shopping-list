import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauth = () => redirectUnauthorizedTo([''])
const redirectLogged = () => redirectLoggedInTo(['shop'])

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLogged }
  },
  {
    path: 'shop',
    loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauth }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
