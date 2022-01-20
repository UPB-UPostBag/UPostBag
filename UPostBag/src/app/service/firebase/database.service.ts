import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShoppingList } from '../models/shopping-list.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor( private angularFirestore: AngularFirestore ) { }

  getAllOf(collection: string){
    return this.angularFirestore.collection(collection).snapshotChanges();
  }

  getList(uid){
    return this.angularFirestore.collection("shoppingList").doc(uid).valueChanges();
  } 

  createList(list: ShoppingList){
    return new Promise<any>( (resolve,rejects) => {
      this.angularFirestore.collection('shoppingList').add(ShoppingList).then( response => { console.log(response), error => rejects(error) } )
    } )
  }

  updateList(list: ShoppingList, id){
    return this.angularFirestore.collection("shoppingList").doc(id).update({
      id: list.id,
      users: list.users,
      products: list.products
    });
  }

  deleteList(list){
    return this.angularFirestore.collection('shoppingList').doc(list.uid).delete();
  }
}