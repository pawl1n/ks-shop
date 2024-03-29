import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'interfaces/order';
import { CartService } from 'services/cart.service';
import { MaterialService } from 'services/material.service';
import { OrdersService } from 'services/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass'],
})
export class CheckoutComponent implements OnInit {
  flexDirection: string = 'row';
  items: any[] = [];
  credentialsForm!: FormGroup;
  addressForm!: FormGroup;
  totalPrice: number = 0;
  disabled: boolean = false;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router,
    private matService: MaterialService
  ) {}

  ngOnInit(): void {
    if (this.cartService.getItems().length === 0) {
      this.matService.openSnackBar($localize`Кошик порожній`);
      this.router.navigate(['cart']);
    }

    this.credentialsForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.addressForm = new FormGroup({
      city: new FormControl('', [Validators.required]),
      department: new FormControl('1', [Validators.required]),
      shippingMethod: new FormControl('NovaPoshta'),
    });
  }

  order() {
    this.disabled = true;
    const order: Order = {
      list: this.cartService.getItems().map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
        };
      }),
      user: this.credentialsForm.value,
      shipping: this.addressForm.value,
    };
    this.ordersService.create(order).subscribe({
      next: (ans: any) => {
        this.cartService.clearCart();
        this.router.navigate(['catalog']);
        this.disabled = false;
      },
    });
  }

  getEmailError() {
    if (this.credentialsForm.get('email')?.hasError('required')) {
      return $localize`Необхідно ввести email`;
    } else if (this.credentialsForm.get('email')?.hasError('email')) {
      return $localize`Неправильно введено email`;
    } else return '';
  }

  getNameError() {
    if (this.credentialsForm.get('name')?.hasError('required')) {
      return $localize`Необхідно ввести імʼя`;
    } else return '';
  }

  getPhoneError() {
    if (this.credentialsForm.get('phone')?.hasError('required')) {
      return $localize`Необхідно ввести номер телефону`;
    } else return '';
  }

  getDepartmentError() {
    if (this.addressForm.get('department')?.hasError('required')) {
      return $localize`Необхідно ввести номер відділу`;
    } else return '';
  }

  getCityError() {
    if (this.addressForm.get('city')?.hasError('required')) {
      return $localize`Необхідно ввести місто`;
    } else return '';
  }
}
