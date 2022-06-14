import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.sass'],
})
export class ReturnsComponent implements OnInit {
  phoneNumber = environment.phoneNumber;

  constructor() {}

  ngOnInit(): void {}
}
