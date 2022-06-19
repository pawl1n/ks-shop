import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map, Observable } from 'rxjs';
import { Response } from 'interfaces/response';
import { Product, instanceofProduct } from 'interfaces/product';
import { MaterialService } from 'services/material.service';
import { cartItem } from 'interfaces/cartItem';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private path = environment.serverUrl + '/api/products/';
  constructor(private http: HttpClient, private matService: MaterialService) {}

  get(
    categories = '',
    sizes = '',
    types = '',
    offset = 0,
    limit = 10
  ): Observable<Product[]> {
    let params = {
      controlStock: true,
      categories,
      sizes,
      types,
      limit,
      offset,
    };
    return this.http
      .get<Response>(this.path, {
        params,
      })
      .pipe(
        map((response: Response) => {
          if (response.success && response.data instanceof Array) {
            return response.data;
          }
          this.matService.openSnackBar(response.message);
          return [];
        }),
        first()
      );
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Response>(this.path + id).pipe(
      map((response: Response) => {
        if (response.success && instanceofProduct(response.data)) {
          return response.data;
        } else {
          this.matService.openSnackBar(response.message);
          return null;
        }
      }),
      first()
    );
  }

  getPrice(items: cartItem[]): Observable<any> {
    return this.http
      .post<Response>(this.path + 'get/price', {
        items: items,
      })
      .pipe(
        map((response: Response) => {
          if (response.success) {
            return response.data;
          } else {
            this.matService.openSnackBar(response.message);
            return response;
          }
        }),
        first()
      );
  }

  getSizes(types: string = '', categories: string = ''): Observable<any> {
    return this.http
      .get<Response>(this.path + 'get/sizes', {
        params: {
          types,
          categories,
        },
      })
      .pipe(
        map((response: Response) => {
          if (response.success) {
            return response.data;
          } else {
            this.matService.openSnackBar(response.message);
            return response;
          }
        }),
        first()
      );
  }

  getTypes(): Observable<any> {
    return this.http.get<Response>(this.path + 'get/types').pipe(
      map((response: Response) => {
        if (response.success) {
          return response.data;
        } else {
          this.matService.openSnackBar(response.message);
          return response;
        }
      }),
      first()
    );
  }
}
