import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { instanceofProduct, Product } from 'interfaces/product';
import { of, switchMap } from 'rxjs';
import { CartService } from 'services/cart.service';
import { ProductsService } from 'services/products.service';
import { cartItem } from 'interfaces/cartItem';
import { FormControl, Validators } from '@angular/forms';
import { MaterialService } from 'services/material.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass'],
})
export class ProductComponent implements OnInit {
  product?: Product;
  width: number = 50;
  quantityFormControl!: FormControl;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private matService: MaterialService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            return this.productsService.getById(params['id']);
          } else {
            return of(null);
          }
        })
      )
      .subscribe({
        next: (product: Product | any) => {
          if (product && instanceofProduct(product)) {
            this.product = product;
            this.quantityFormControl = new FormControl('', [
              Validators.min(1),
              Validators.max(product.stock ?? 0),
              Validators.required,
            ]);
            this.quantityFormControl.patchValue(1);
          }
        },
      });
  }

  getQuantityError(): string {
    if (this.quantityFormControl.hasError('required')) {
      return 'Необхідно обрати кількість товару';
    } else if (this.quantityFormControl.hasError('min')) {
      return 'Неможливо замовити товару менше, ніж 1';
    } else if (this.quantityFormControl.hasError('max')) {
      return `В наявності лише ${this.product?.stock ?? 0}`;
    } else {
      return '';
    }
  }

  addToCart() {
    if (this.product) {
      const cartItem: cartItem = {
        id: this.product._id,
        name: this.product.name,
        size: this.product.size ?? '',
        quantity: this.quantityFormControl.value,
      };
      if (this.cartService.itemInCart(cartItem)) {
        this.matService.openSnackBar($localize`Даний товар вже є у кошику`);
      } else if (!this.quantityFormControl.invalid) {
        this.cartService.addToCart(cartItem);
        this.matService.openSnackBar($localize`Товар додано успішно`);
      }
    }
  }

  getSrc(image: string): string {
    if (typeof image == 'string' && image.startsWith('uploads')) {
      return environment.serverUrl + '/' + image;
    }
    return image;
  }
}
