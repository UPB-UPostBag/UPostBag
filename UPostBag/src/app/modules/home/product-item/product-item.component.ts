import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() productsItems;

  constructor() { }

  ngOnInit(): void {
    
  }
  show(){
    console.log("items", this.productsItems);
  }
  

}
