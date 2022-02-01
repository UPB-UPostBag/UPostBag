import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GlobalLists } from '../models/global-list.model';
import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  constructor(private angularFirestore: AngularFirestore) { }
  
  //GLoblaList Functions
  createList(collection: string, uid: string, isPrim:boolean, list) {
    new Promise<any>((resolve, rejects) => {
      this.angularFirestore.collection(collection).add(list).then(response => {
        (isPrim) ?
        this.angularFirestore.collection(environment.firebaseCollections.allUsers).doc(uid).update({
          primaryList: response.id,
          own: firebase.firestore.FieldValue.arrayUnion(response.id)
        }) :
        this.angularFirestore.collection(environment.firebaseCollections.allUsers).doc(uid).update({
          own: firebase.firestore.FieldValue.arrayUnion(response.id)
        }),
        error => rejects(error)
      })
    })
  }

  updateList(list: GlobalLists, id: string) {
    return this.angularFirestore.collection(environment.firebaseCollections.Lists).doc(id).update({
      id: list.id,
      name: list.name,
      collaborator: list.collaborator,
      items: list.items
    });
  }
  
  deleteList(list) {
    list.collaborator.map( collaborators => {
      (collaborators.isOwner) ?
        this.angularFirestore.collection(environment.firebaseCollections.allUsers).doc(collaborators.email).update({
          own: firebase.firestore.FieldValue.arrayRemove(list.id)
        }) :
        this.angularFirestore.collection(environment.firebaseCollections.allUsers).doc(collaborators.email).update({
          collab: firebase.firestore.FieldValue.arrayRemove(list.id)
        });
    })
    return this.angularFirestore.collection(environment.firebaseCollections.Lists).doc(list.id).delete();
  }


  changeNameList(uid: string, newName: string){
    this.angularFirestore.collection(environment.firebaseCollections.Lists).doc(uid).update({
      name: newName
    });
  }
  
  //User Functions
  updateUser(list: GlobalLists, id: string) {
    return this.angularFirestore.collection(environment.firebaseCollections.Lists).doc(id).update({
      id: list.id,
      name: list.name,
      collaborator: list.collaborator,
      items: list.items
    });
  }
  
  deleteUser(list) {
    return this.angularFirestore.collection(environment.firebaseCollections.Lists).doc(list.uid).delete();
  }

  changePrimaryList(newPrimary: string, id: string) {
    return this.angularFirestore.collection(environment.firebaseCollections.allUsers).doc(id).update({
      primaryList: newPrimary
    });
  }

  createUser(collection: string,id, user) {
    new Promise<any>((resolve, rejects) => {
      this.angularFirestore.collection(environment.firebaseCollections.allUsers).doc(id).set(user);
    })
  }
  //ProductsByDefault Functions
  /**********************************
   * by the structure this list shouldn´t be change.
   * I really hope you know what are you doing in opositive case
   **********************************/

  //Generic Function
  getAllOf(collection: string) {
    return this.angularFirestore.collection(collection).snapshotChanges();
  }

  getDocumentOf(collection: string, uid: string) {
    return this.angularFirestore.collection(collection).doc(uid).valueChanges();
  }


  createDocumentOnWithID(collection: string, uid: string, element) {
    this.angularFirestore.collection(collection).doc(uid).set(element, { merge: true }).then(response => { console.log(response) });
  }

}