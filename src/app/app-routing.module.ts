import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
        title: 'Кішка стрибає | Новий одяг',
      },
      {
        path: 'catalog',
        children: [
          {
            path: '',
            component: CatalogComponent,
            title: 'Кішка стрибає | Каталог',
          },
          {
            path: ':id',
            component: ProductComponent,
            title: 'Кішка стрибає | Огляд товару',
          },
        ],
      },
      {
        path: 'cart',
        children: [
          {
            path: '',
            component: CartComponent,
            title: 'Кішка стрибає | Кошик',
          },
          {
            path: 'checkout',
            component: CheckoutComponent,
            title: 'Кішка стрибає | Замовлення',
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'uk',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
