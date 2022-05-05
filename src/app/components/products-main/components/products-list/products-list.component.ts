import { Component, Input } from '@angular/core';
import { CategoryModel } from 'src/app/core/models/categories.model';
import { ProductModel } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  @Input() listOfProducts: ProductModel[];

  captionText = 'List of products';
  listOfCategories: CategoryModel[] = [];

}
