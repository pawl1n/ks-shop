import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DeliveryComponent } from './info/delivery/delivery.component';
import { PaymentsComponent } from './info/payments/payments.component';
import { AboutUsComponent } from './info/about-us/about-us.component';
import { ReturnsComponent } from './info/returns/returns.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
        title: `Кішка стрибає | Новий одяг`,
      },
      {
        path: 'catalog',
        children: [
          {
            path: '',
            component: CatalogComponent,
            title: $localize`Кішка стрибає | Каталог`,
          },
          {
            path: ':id',
            component: ProductComponent,
            title: $localize`Кішка стрибає | Огляд товару`,
          },
        ],
      },
      {
        path: 'cart',
        children: [
          {
            path: '',
            component: CartComponent,
            title: $localize`Кішка стрибає | Кошик`,
          },
          {
            path: 'checkout',
            component: CheckoutComponent,
            title: $localize`Кішка стрибає | Замовлення`,
          },
        ],
      },
      {
        path: 'delivery',
        component: DeliveryComponent,
        title: $localize`Кішка стрибає | Доставка`,
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        title: $localize`Кішка стрибає | Оплата`,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        title: $localize`Кішка стрибає | Про нас`,
      },
      {
        path: 'returns',
        component: ReturnsComponent,
        title: $localize`Кішка стрибає | Повернення`,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
