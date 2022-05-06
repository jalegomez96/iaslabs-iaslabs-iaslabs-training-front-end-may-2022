import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryModel } from 'src/app/core/models/categories.model';
import { typesOfProducts } from '../../constants/types-of-products.constant';


@Injectable()
export class CategoryService {

  private readonly url = 'http://localhost:8080/types';
  constructor(private readonly http: HttpClient) { }

  getCategory(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${this.url}/${true}`);
  }

}
