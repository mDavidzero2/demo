import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Prodcuts';
import { ServiceService } from '../service.service';
// import { HomeModel } from './home.component.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private service: ServiceService) {
  }
  totalAmount: number = 0;
  removeRow(index: number) {
    this.rows.splice(index, 1);
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    this.totalAmount = this.rows.reduce((total, row) => total + row.amount, 0);
  }

  calculateAmount(row: any) {
    row.amount = row.quantity * row.ratePerKg;
    this.calculateTotalAmount();
  }
  rows = [
    { id: 0, productName: '', ratePerKg: 0, quantity: "1.0", amount: 0 },
    { id: 0, productName: '', ratePerKg: 0, quantity: "1.0", amount: 0 },
    { id: 0, productName: '', ratePerKg: 0, quantity: "1.0", amount: 0 },
    { id: 0, productName: '', ratePerKg: 0, quantity: "1.0", amount: 0 },
    { id: 0, productName: '', ratePerKg: 0, quantity: "1.0", amount: 0 }
  ];
  printTable(): void {
    var divElements = document.getElementById("printTable")?.outerHTML;
    var oldPage = document.body.innerHTML;
    document.body.innerHTML =
      "<html><head><title></title></head><body>" +
      divElements + "</body></html>";
    window.print();
    document.body.innerHTML = oldPage;
  }
  addRow() {
    this.rows.push({
      id: 0,
      productName: '',
      ratePerKg: 0,
      quantity: "1.0",
      amount: 0
    });
  }
  ngOnInit(): void {
    this.service.getProductList().subscribe(
      (res: Product[]) => {
        this.productData = res;
      }
    );
  }
  productData: Product[] = [];
  selectProduct(row: any, product: any) {
    row.productName = product.billingName;
    row.ratePerKg = product.ratePerKg;
    this.calculateAmount(row);
    this.hideDropdown();
  }
  showDropdown: boolean = false;

  hideDropdown() {
    this.showDropdown = false;
  }
  searchText: string = '';
  openNewTab(): void {
    const newTabUrl = 'http://localhost:4200';
    window.open(newTabUrl, '_blank');
  }
  validateInput(event: any) {
    const pattern = /(^[0-9]*)+(\.[0-9]*)?$/;
    const inputChar = event.key;
    const currentValue = event.target.value;
    if (!pattern.test(currentValue + inputChar)) {
      event.preventDefault();
    }
  }
  updateRatePerKg(row: any, selectedProductName: string) {
    const selectedProduct = this.productData.find(product => product.billingName === selectedProductName);
    if (selectedProduct) {
      row.ratePerKg = selectedProduct.ratePerKg;
      row.productName = selectedProduct.billingName;
      row.id = selectedProduct.id;
      this.calculateAmount(row);
    }
  }
  shouldDisablePrintButton(): boolean {
    //return this.rows.some(row => !row.productName);
    return this.rows.some(row => !row.productName || !row.ratePerKg || !row.quantity);
  }
  saveRowProduct(row: any) {
    const requestBody = {
      productId: row.id,
      productName: row.productName,
      billingName: row.productName,
      ratePerKg: row.ratePerKg
    };
    console.log(requestBody);
    this.service.saveProduct(requestBody).subscribe();
  }
}
