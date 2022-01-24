import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  valuesFinance: Array<any>[] = [];

  finance = new FormGroup({
    title: new FormControl(''),
    type: new FormControl(''),
    value: new FormControl(''),
  });

  

  add(): void {
    const finances = this.finance.value;
    this.valuesFinance.push(finances);
    this.save(this.valuesFinance);
    this.finance.reset();
   
    
  }

  save(arrayValue: Array<any>[]) {
    const setValueFinance = arrayValue;
    localStorage.setItem('DB', JSON.stringify(setValueFinance));
  }

  ativar = () => {
    const modal = document.querySelector('.modal-container');
    return modal?.setAttribute('style', 'display:flex');
  };

  closeModal = () => {
    const modalAberto = document.querySelector('.modal-container');
    return modalAberto?.setAttribute('style', 'display:none');
  };
}
