import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CategoryModel } from 'src/app/core/models/categories.model';
import { typesOfProducts } from '../../constants/types-of-products.constant';

@Injectable()
export class CategoryService {
  private readonly url = 'http://localhost:8080/types';
  constructor(private readonly http: HttpClient) {}

  getCategory(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${this.url}/${true}`);
  }

  saveCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(this.url, category);
  }
}
