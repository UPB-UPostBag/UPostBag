import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() productsItems;
  total : number = 0;
  status: number = 0;
  constructor() { }

  ngOnInit(): void {
    
  }
  show(){
    console.log("items", this.productsItems);
  }
  
  getTotalPrice(){
    this.total=0;
    this.productsItems.forEach(element => {
      this.total += element.price;
    });
  }

  changeView(){

  }
}
