import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/service/firebase/database.service';

@Component({
  selector: 'product-by-default',
  templateUrl: './product-by-default.component.html',
  styleUrls: ['./product-by-default.component.scss']
})
export class ProductByDefaultComponent implements OnInit {

  @Input() products;

  constructor( private databaseSvc: DatabaseService ) { }

  ngOnInit(): void {
  }

  productSelected(item){
    //Eliminar de mi lista y agrgar en la base de datos
    //no llamamos a las bd para sacar el producto, pero si lo sacamos de nuestro JSON
    //y llamar a la base de datos para agragar en 
   // this.databaseSvc.createOn("products","ByDefault",item)
  }

}
