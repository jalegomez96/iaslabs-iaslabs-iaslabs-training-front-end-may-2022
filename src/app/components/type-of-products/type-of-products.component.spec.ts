import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfProductsComponent } from './type-of-products.component';

describe('TypeOfProductsComponent', () => {
  let component: TypeOfProductsComponent;
  let fixture: ComponentFixture<TypeOfProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
