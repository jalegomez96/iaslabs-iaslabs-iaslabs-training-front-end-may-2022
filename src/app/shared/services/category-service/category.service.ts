import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CategoryModel } from 'src/app/core/models/categories.model';
import { typesOfProducts } from '../../constants/types-of-products.constant';

@Injectable()
export class CategoryService {
  constructor() {}

  getAllCategory(): Observable<CategoryModel[]> {
    return of(typesOfProducts);
  }

  saveCategory(category: CategoryModel): Observable<CategoryModel> {
    return of(category).pipe(
      tap(() => {
        typesOfProducts.push(category);
      })
    );
  }
}
