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
    this.getAllList();
  }

  getAllList(){
    this.databaseSvc.getAllOf("products").subscribe(res => {
      this.products = res.map( e => {
        return {
          id : e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } //as ShoppingList;
      } )
    } ); 
  }

}
