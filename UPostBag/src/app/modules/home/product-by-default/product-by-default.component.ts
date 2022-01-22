import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/service/firebase/database.service';

@Component({
  selector: 'product-by-default',
  templateUrl: './product-by-default.component.html',
  styleUrls: ['./product-by-default.component.scss']
})
export class ProductByDefaultComponent implements OnInit {

  products

  constructor( private databaseSvc: DatabaseService ) { }

  ngOnInit(): void {
    //this.getAllList();
    this.loadProductsByDefault();
  }

  loadProductsByDefault(){
    this.databaseSvc.getDocumentOf("products","ByDefault").subscribe(res => {
      this.products = res;
    });
  }

}
