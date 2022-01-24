import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Finance } from './finance';



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

  load:any = localStorage.getItem("DB")
  loader = JSON.parse(this.load)

   



  add(): void {
    const finances = this.finance.value;
    this.valuesFinance.push(finances);
    this.save(this.valuesFinance);
    this.finance.reset();
    
    
    
    
  }

  save(arrayValue: Array<any>[]) {
    const setValueFinance = arrayValue;
    localStorage.setItem('DB', JSON.stringify(new Object(setValueFinance)));
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
