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
    this.loadProductsByDefault();
  }

  loadProductsByDefault(){
    this.databaseSvc.getDocumentOf("products","ByDefault").subscribe(res => {
      this.products = res;
    });
  }

  productSelected(item){
    //Eliminar de mi lista y agrgar en la base de datos
    //no llamamos a las bd para sacar el producto, pero si lo sacamos de nuestro JSON
    //y llamar a la base de datos para agragar en 
    this.databaseSvc.createOn("products","ByDefault",item)
  }

}
