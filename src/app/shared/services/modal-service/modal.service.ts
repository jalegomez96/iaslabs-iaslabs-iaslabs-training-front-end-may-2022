import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {

  constructor() { }

  showModal(title: string, message: string, typeMessage: string): void {
    alert(`${typeMessage}-${title} ---- ${message} ---`);
  }
}
