import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ProductModel } from 'src/app/core/models/product.model';
import { products } from '../../constants/products.constant';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {

  private readonly changes = new BehaviorSubject<boolean>(false);
  private readonly url = 'http://localhost:8080/products';

  constructor(private readonly http: HttpClient) { }

  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.url}/${true}`);
  }

  saveProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.url, {...product, state: true});
  }

  getChanges(): Observable<boolean> {
    return this.changes.asObservable().pipe(
      tap( () => {
        console.log('Executing change...');
      })
    );
  }

  setChanges(value: boolean): void {
    this.changes.next(value);
  }

}
