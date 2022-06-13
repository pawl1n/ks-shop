import { Injectable } from '@angular/core';
import { cartItem } from 'interfaces/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    this.loadCart();
  }

  items: cartItem[] = [];

  addToCart(addedItem: cartItem) {
    const item: cartItem = {
      id: addedItem.id,
      name: addedItem.name,
      size: addedItem.size,
      quantity: addedItem.quantity,
    };
    this.items.push(item);
    this.saveCart();
  }

  getItems() {
    return this.items;
  }

  loadCart(): void {
    this.items = JSON.parse(localStorage.getItem('cart_items') ?? '[]') ?? [];
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.items));
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem('cart_items');
  }

  removeItem(item: cartItem) {
    const index = this.items.findIndex((o) => o.id === item.id);

    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }

  itemInCart(item: cartItem): boolean {
    return this.items.findIndex((o) => o.id === item.id) > -1;
  }

  count(): number {
    return this.items.length;
  }
}
