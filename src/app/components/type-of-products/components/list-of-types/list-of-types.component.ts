import { CategoryModel } from 'src/app/core/models/categories.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-of-types',
  templateUrl: './list-of-types.component.html',
  styleUrls: ['./list-of-types.component.css'],
})
export class ListOfTypesComponent {
  @Input() listOfCategories: CategoryModel[];
}
