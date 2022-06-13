import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map, Observable, of } from 'rxjs';
import { Response } from 'interfaces/response';
import { Order } from 'interfaces/order';
import { MaterialService } from 'services/material.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private path = environment.serverUrl + '/api/orders/';
  constructor(private http: HttpClient, private matService: MaterialService) {}

  create(order: Order): Observable<Order> | any {
    return this.http.post<Response>(this.path, order).pipe(
      map((response: Response) => {
        if (response.success && response.data) {
          this.matService.openSnackBar(
            $localize`Замовлення №${response.data.order} успішно створено`
          );
          return response.data;
        }
        this.matService.openSnackBar(response.message);
        return response;
      })
    );
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Response>(this.path + id).pipe(
      map((response: Response) => {
        if (response.success) {
          return response.data;
        } else {
          this.matService.openSnackBar(response.message);
          return null;
        }
      }),
      first()
    );
  }
}
