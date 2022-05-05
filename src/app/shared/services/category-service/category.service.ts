import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryModel } from 'src/app/core/models/categories.model';
import { typesOfProducts } from '../../constants/types-of-products.constant';


@Injectable()
export class CategoryService {

  constructor() { }

  getCategory(): Observable<CategoryModel[]> {
    return of(typesOfProducts);
  }

}
