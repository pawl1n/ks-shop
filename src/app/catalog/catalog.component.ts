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
import { FormControl, FormGroup } from '@angular/forms';
import { CategoriesService } from 'services/categories.service';
import { Category } from 'interfaces/category';

SwiperCore.use([Lazy, Pagination, Navigation]);

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.sass'],
})
export class CatalogComponent implements OnInit {
  cols: number = 4;
  products: Product[] = [];
  filtersForm!: FormGroup;
  categories: Category[] = [];
  offset: number = 0;
  limit: number = 10;
  sizes: string[] = [];
  loadMoreButton: boolean = false;

  constructor(
    public breakpointObserver: BreakpointObserver,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.filtersForm = new FormGroup({
      category: new FormControl(''),
      size: new FormControl(''),
    });

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

    this.categoriesService.get().subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    this.productsService
      .get('', '', 0, this.limit)
      .subscribe((products: Product[]) => {
        this.products = products;
        this.offset += products.length ? this.limit : 0;

        this.loadMoreButton = products.length >= this.limit;
      });

    this.productsService.getSizes().subscribe((sizes: string[]) => {
      this.sizes = sizes;
    });
  }

  getSrc(image: string): string {
    if (typeof image == 'string' && image.startsWith('uploads')) {
      return environment.serverUrl + '/' + image;
    }
    return image;
  }

  loadMore(): void {
    let categories = this.filtersForm.value.category;
    let sizes = this.filtersForm.value.size;
    this.productsService
      .get(categories, sizes, this.offset, this.limit)
      .subscribe({
        next: (products: Product[]) => {
          this.products = this.products.concat(products);
          this.offset += products.length ? this.limit : 0;

          this.loadMoreButton = products.length >= this.limit;
        },
      });
  }

  filtersChanged(): void {
    console.log(this.limit);
    let categories = this.filtersForm.value.category;
    let sizes = this.filtersForm.value.size;
    this.offset = 0;
    this.productsService
      .get(categories, sizes, this.offset, this.limit)
      .subscribe((products: Product[]) => {
        this.products = products;
        this.offset += products.length ? this.limit : 0;

        this.loadMoreButton = products.length >= this.limit;
      });
  }
}
