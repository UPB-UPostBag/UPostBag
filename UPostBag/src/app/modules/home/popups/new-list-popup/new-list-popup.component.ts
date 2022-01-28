import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/service/firebase/database.service';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-new-list-popup',
  templateUrl: './new-list-popup.component.html',
  styleUrls: ['./new-list-popup.component.scss']
})
export class NewListPopupComponent implements OnInit {
  actualUser;
  creacionLista = new FormGroup({
    listname : new FormControl('', Validators.required ),
    isPrimary : new FormControl(false)
  })

  constructor(private databaseSvc: DatabaseService,
    private dialogRef: MatDialogRef<NewListPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
      this.actualUser = this.data.dataKey
    }

  createNewList(){
    if(this.creacionLista.valid){
      console.log(this.actualUser)
    //added on Global list
      this.databaseSvc.createList('globalLists',{
      collaborator: [{
        email:this.actualUser.email,
        isOwner:true,
        name:this.actualUser.displayName,
        photoURL:this.actualUser.photoURL,
      }],
      items:[],
      name: this.creacionLista.value.listname
    });
    if(this.creacionLista.value.isPrimary){
      //change user primary
    }
    this.onClose();
    }
  }

  onClose(){
    this.creacionLista.reset();
    this.dialogRef.close();
  }

}
