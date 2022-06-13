import { Component, OnInit } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CartService } from 'services/cart.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass'],
})
export class MainLayoutComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.HandsetPortrait])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  menuItems = menuItems;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cartService: CartService,
    private titleService: Title
  ) {
    this.titleService.setTitle($localize`${this.titleService.getTitle()}`);
  }

  ngOnInit(): void {}

  getCartCount(): number {
    return this.cartService.count() ?? 0;
  }
}

const menuItems = [
  {
    path: 'catalog',
    title: $localize`Каталог`,
  },
  // {
  //   path: 'login',
  //   title: 'Вхід',
  // },
  // {
  //   path: 'register',
  //   title: 'Реєстрація',
  // },
];
