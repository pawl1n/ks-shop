import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { cartItem } from 'interfaces/cartItem';
import { CartService } from 'services/cart.service';
import { ProductsService } from 'services/products.service';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit {
  totalPrice: number = 0;
  itemsWithPrice: any[] = [];
  quantityFormArray: any = new FormArray([]);
  flexDirection: string = 'row';
  orderAvailable: boolean = false;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints[Breakpoints.HandsetPortrait]) {
          this.flexDirection = 'column';
        } else {
          this.flexDirection = 'row';
        }
      });

    let items = this.cartService.getItems();
    this.itemsWithPrice = items;
    this.displayItems();
    this.retrieveData(items);
  }

  retrieveData(items: cartItem[]) {
    if (!items) {
      this.totalPrice = 0;
      this.itemsWithPrice = [];
      return;
    }

    if (this.quantityFormArray.length) {
      for (let i = 0; i < items.length; i++) {
        items[i].quantity = this.quantityFormArray.at(i).value;
      }
    }
    this.productsService.getPrice(items).subscribe({
      next: (ans: any) => {
        this.totalPrice = ans.totalPrice;
        this.itemsWithPrice = ans.items;

        this.displayItems(true);
        this.orderAvailable = true;
      },
      error: (err) => {
        this.orderAvailable = false;
      },
    });
  }

  displayItems(updateCart: boolean = false) {
    if (updateCart) {
      this.cartService.clearCart();
    }
    this.quantityFormArray.clear();

    for (let item of this.itemsWithPrice) {
      let quantityFormControl = new FormControl(item.quantity, [
        Validators.min(1),
        Validators.max(item?.stock ?? 0),
        Validators.required,
      ]);

      this.quantityFormArray.push(quantityFormControl);

      if (updateCart) {
        this.cartService.addToCart(item);
      }
    }
  }

  removeFromCart(item: cartItem) {
    this.cartService.removeItem(item);
    let items = this.cartService.getItems();
    this.retrieveData(items);
  }

  clearCart() {
    if (window.confirm($localize`Ви впевнені, що бажаєте очистити кошик?`)) {
      this.cartService.clearCart();
      this.totalPrice = 0;
      this.itemsWithPrice = [];
    }
  }

  getQuantityError(i: number, stock: number): string {
    if (this.quantityFormArray.at(i).hasError('required')) {
      return $localize`Необхідно обрати кількість товару`;
    } else if (this.quantityFormArray.at(i).hasError('min')) {
      return $localize`Неможливо замовити товару менше, ніж 1`;
    } else if (this.quantityFormArray.at(i).hasError('max')) {
      return $localize`В наявності лише ${stock}`;
    } else {
      return '';
    }
  }
}
