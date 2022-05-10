import {
  title,
  message,
  typeMessage,
} from './../products-main/constant/message.constant';
import { ModalService } from 'src/app/shared/services/modal-service/modal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, mergeMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category-service/category.service';
import { CategoryModel } from 'src/app/core/models/categories.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-of-products',
  templateUrl: './type-of-products.component.html',
  styleUrls: ['./type-of-products.component.css'],
})
export class TypeOfProductsComponent implements OnInit {
  listOfCategories: CategoryModel[] = [];

  constructor(
    private readonly categoryService: CategoryService,
    private readonly modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.onSearchCategories().subscribe();
  }

  onSearchCategories(): Observable<CategoryModel[]> {
    return this.categoryService.getCategory().pipe(
      tap((categories: CategoryModel[]) => {
        this.listOfCategories = [...categories];
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.modalService.showModal(
            title.search,
            message.error400,
            typeMessage.error
          );
        } else {
          this.modalService.showModal(
            title.search,
            'unexpected error with services down',
            typeMessage.error
          );
        }
        return throwError(error);
      })
    );
  }

  onSaveCategory(category: CategoryModel): void {
    this.categoryService
      .saveCategory(category)
      .pipe(
        mergeMap(() => {
          this.modalService.showModal(
            title.save,
            message.saveSucces,
            typeMessage.succes
          );
          return this.onSearchCategories();
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status >= 500) {
            this.modalService.showModal(
              title.save,
              'Call 8080808 for tecnichal attention',
              typeMessage.error
            );
          }
          this.modalService.showModal(
            title.save,
            message.error,
            typeMessage.error
          );

          return throwError(error);
        })
      )
      .subscribe();
  }
}
