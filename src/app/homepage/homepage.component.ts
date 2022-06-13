import { Component, OnInit } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass'],
})
export class HomepageComponent implements OnInit {
  colspanText: number = 1;
  colspanImage: number = 1;

  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.Small,
        Breakpoints.HandsetPortrait,
        Breakpoints.XLarge,
      ])
      .subscribe((state: BreakpointState) => {
        if (
          state.breakpoints[Breakpoints.Small] ||
          state.breakpoints[Breakpoints.HandsetPortrait]
        ) {
          this.colspanText = 5;
          this.colspanImage = 5;
        } else if (state.breakpoints[Breakpoints.XLarge]) {
          this.colspanText = 2;
          this.colspanImage = 3;
        } else {
          this.colspanText = 2;
          this.colspanImage = 3;
        }
      });
  }
}
