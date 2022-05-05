import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { ProductModel } from 'src/app/core/models/product.model';
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

  constructor(private readonly productService: ProductService,
              private readonly modalService : ModalService) { }

  ngOnInit(): void {
    this.onSearchProducts().subscribe();
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
        this.modalService.showModal(title.save, error.message, typeMessage.error);
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
          return throwError(error);
        }
      })
    );
  }

}
