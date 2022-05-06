import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/core/models/product.model';
import { ModalService } from 'src/app/shared/services/modal-service/modal.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {

  @Output() saveEmit = new EventEmitter<ProductModel>();

  form: FormGroup;
  suscription$: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modelService: ModalService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.listenerTypeOfProduct();
  }

  createForm(): void {
    this.form = this.fb.group({
      productId: ['', [Validators.required, Validators.maxLength(10)]],
      typeOfProduct: [undefined, [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      price: [0, [Validators.required, Validators.maxLength(10)]],
    });
  }

  listenerTypeOfProduct(): void {
    this.suscription$ = this.form.get('typeOfProduct').valueChanges.subscribe( (typeOfProduct: string) => {
      if(typeOfProduct === '1') {
        this.form.get('name').setValidators([Validators.required, Validators.maxLength(10)]);
      }
    });
  }

  onClickSave(): void {
    console.log(this.form);

    if (this.form.valid) {
      this.saveEmit.emit(this.form.value);
    } else {
      this.modelService.showModal('Invalid form', 'Check the form', 'Error');
    }
  }

  ngOnDestroy(): void {
    this.suscription$.unsubscribe();
  }
}
