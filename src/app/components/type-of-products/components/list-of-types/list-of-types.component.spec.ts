import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTypesComponent } from './list-of-types.component';

describe('ListOfTypesComponent', () => {
  let component: ListOfTypesComponent;
  let fixture: ComponentFixture<ListOfTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
