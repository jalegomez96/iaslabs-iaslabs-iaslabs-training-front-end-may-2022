import { AppComponent } from './app.component';

// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http/';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { ProductsListComponent } from './components/products-main/components/products-list/products-list.component';
import { TypeOfProductsComponent } from './components/type-of-products/type-of-products.component';
import { ListOfTypesComponent } from './components/type-of-products/components/list-of-types/list-of-types.component';
import { FormProductTypeComponent } from './components/type-of-products/components/form-product-type/form-product-type.component';
import { ProductsMainComponent } from './components/products-main/products-main.component';

// Services
import { ProductService } from './shared/services/product-service/product.service';
import { CategoryService } from './shared/services/category-service/category.service';
import { TestService } from './shared/services/test-service/test.service';
import { ProductComponent } from './components/products-main/components/product/product.component';
import { ModalService } from './shared/services/modal-service/modal.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsListComponent,
    TypeOfProductsComponent,
    ListOfTypesComponent,
    FormProductTypeComponent,
    ProductsMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ProductService, CategoryService, TestService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
