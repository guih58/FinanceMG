import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Finance } from './finance';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public valuesFinance: Finance[] = [];
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required,
        ]),
      ],
      type: [],
      value: [],
    });
    this.load();
  }

  entrada() {
    let transactions = this.valuesFinance;
    let actionTreasaction = transactions.reduce((acc, transactions) => {
      if (transactions.type === 'Entrada') {
        return acc + transactions.value;
      }
      return acc;
    }, 0);

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(actionTreasaction);
  }

  saida() {
    let transactions = this.valuesFinance;
    let actionTreasaction = transactions.reduce((acc, transactions) => {
      if (transactions.type === 'Saida') {
        return acc + transactions.value;
      }
      return acc;
    }, 0);

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(actionTreasaction);
  }

  total() {
    let transactions = this.valuesFinance;
    let actionTreasaction = transactions.reduce((acc, transactions) => {
      return acc + transactions.value;
    }, 0);

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(actionTreasaction);
  }

  add(): void {
    const id = this.valuesFinance.length + 1;
    const title = this.form.controls['title'].value;
    const type = this.form.controls['type'].value;
    const values = this.form.controls['value'].value;

    this.valuesFinance.push(new Finance(id, title, type, values));

    this.save();
    this.clear();
  }

  save() {
    const data = JSON.stringify(this.valuesFinance);
    localStorage.setItem('DB', data);
  }

  clear() {
    this.form.reset();
  }

  load() {
    const data: any = localStorage.getItem('DB');
    this.valuesFinance = JSON.parse(data);
    if (data) {
      this.valuesFinance = JSON.parse(data);
    } else {
      this.valuesFinance = [];
    }
  }

  remove(finance: Finance) {
    const index = this.valuesFinance.indexOf(finance);
    if (index != -1) {
      this.valuesFinance.splice(index, 1);
    }
    this.save();
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
