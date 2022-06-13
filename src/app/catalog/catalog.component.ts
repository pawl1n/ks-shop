import { Component, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';

import SwiperCore, { Lazy, Pagination, Navigation } from 'swiper';
import { ProductsService } from 'services/products.service';
import { Product } from 'interfaces/product';
import { environment } from 'src/environments/environment';

SwiperCore.use([Lazy, Pagination, Navigation]);

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.sass'],
})
export class CatalogComponent implements OnInit {
  cols: number = 4;
  products: Product[] = [];

  constructor(
    public breakpointObserver: BreakpointObserver,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints[Breakpoints.HandsetPortrait]) {
          this.cols = 2;
        } else if (state.breakpoints[Breakpoints.Small]) {
          this.cols = 3;
        } else {
          this.cols = 4;
        }
      });

    this.productsService.get().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  getSrc(image: string): string {
    if (typeof image == 'string' && image.startsWith('uploads')) {
      return environment.serverUrl + '/' + image;
    }
    return image;
  }
}
