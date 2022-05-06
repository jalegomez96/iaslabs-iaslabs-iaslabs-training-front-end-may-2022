import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { merge, Observable, throwError, forkJoin } from 'rxjs';
import { catchError, mergeMap, tap, concatMap } from 'rxjs/operators';
import { CategoryModel } from 'src/app/core/models/categories.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { CategoryService } from 'src/app/shared/services/category-service/category.service';
import { ModalService } from 'src/app/shared/services/modal-service/modal.service';
import { ProductService } from 'src/app/shared/services/product-service/product.service';
import { message, title, typeMessage } from './constant/message.constant';

@Component({
  selector: 'app-products-main',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.css']
})
export class ProductsMainComponent implements OnInit {

  listOfProducts: ProductModel[] = [];
  listOfTypes: CategoryModel[] = [];

  constructor(private readonly productService: ProductService,
              private readonly modalService : ModalService,
              private readonly types: CategoryService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(): void {
    // forkJoin([this.onSearchProducts(), this.onSearchtype()]).pipe(
    //   mergeMap(() => {
    //     return this.onSearchProducts();
    //   })
    // ).subscribe();

    this.onSearchType().pipe(
      mergeMap( () => {
        return this.onSearchProducts();
      })
    ).subscribe();
  }



  onSaveProduct(product: ProductModel): void {
    this.productService.saveProduct(product).pipe(
      mergeMap(()=> {
        // success
        this.modalService.showModal(title.save, message.saveSucces, typeMessage.succes);
        return this.onSearchProducts();
      }),
      catchError((error: HttpErrorResponse) => {
        // error
        if(error.status >= 500) {
          this.modalService.showModal(title.save, 'Call 8080808 for tecnichal attention', typeMessage.error);
        }
        this.modalService.showModal(title.save, message.error, typeMessage.error);

        return throwError(error);
      })
    ).subscribe();
  }

  onSearchProducts(): Observable<ProductModel[]> {
    return this.productService.getAllProducts().pipe(
      tap((products: ProductModel[]) => {
        this.listOfProducts = [...products];
      }),
      catchError( (error: HttpErrorResponse) => {
        if(error.status === 400) {
          this.modalService.showModal(title.search, message.error400, typeMessage.error);
        } else {
          this.modalService.showModal(title.search, "unexpected error with services down", typeMessage.error);
        }
        return throwError(error);

      })
    );
  }

  onSearchType(): Observable<CategoryModel[]> {
    return this.types.getCategory().pipe(
      tap( (types) => {
        this.listOfTypes = [...types];
      }),
      catchError( (error: HttpErrorResponse) => {
        this.modalService.showModal(title.search, error.message, typeMessage.error);
        return throwError(error)
      })
    );
  }

}
