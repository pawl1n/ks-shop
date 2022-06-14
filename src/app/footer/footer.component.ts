import { Component, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
})
export class FooterComponent implements OnInit {
  colspan: number = 1;

  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.colspan = 3;
        } else {
          this.colspan = 1;
        }
      });
  }

  changeLocale(locale: string) {
    const locales = ['en', 'uk'];
    for (let item of locales) {
      if (window.location.href.includes(`/${item}/`)) {
        window.location.replace(
          window.location.href.replace(`/${item}/`, `/${locale}/`)
        );
        break;
      }
    }
  }
}
