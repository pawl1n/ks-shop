import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map, Observable } from 'rxjs';
import { Response } from 'interfaces/response';
import { Category } from 'interfaces/category';
import { MaterialService } from 'services/material.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private path = environment.serverUrl + '/api/categories/';
  constructor(private http: HttpClient, private matService: MaterialService) {}

  get(): Observable<Category[]> {
    return this.http.get<Response>(this.path).pipe(
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
}
