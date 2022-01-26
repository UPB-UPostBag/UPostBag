import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalLists } from '../models/global-list.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor( private angularFirestore: AngularFirestore ) { }

  getAllOf(collection: string){
    return this.angularFirestore.collection(collection).snapshotChanges();
  }

  getDocumentOf(collection,uid){
    return this.angularFirestore.collection(collection).doc(uid).valueChanges();
  } 

  createList(list: GlobalLists){
    return new Promise<any>( (resolve,rejects) => {
      this.angularFirestore.collection('shoppingList').add(list).then( response => { console.log(response), error => rejects(error) } )
    } )
  }

  createOn(collection, uid, element){
    this.angularFirestore.collection(collection).doc(uid).set(element, {merge:true}).then( response => { console.log(response) } );
  }

  updateList(list: GlobalLists, id){
    return this.angularFirestore.collection("shoppingList").doc(id).update({
      id: list.id,
      name: list.name,
      collaborator: list.collaborator,
      items: list.items
    });
  }

  deleteList(list){
    return this.angularFirestore.collection('shoppingList').doc(list.uid).delete();
  }
}