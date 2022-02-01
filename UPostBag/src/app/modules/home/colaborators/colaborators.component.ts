import { Component, OnInit ,  EventEmitter, Output, Input} from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'colaborators',
  templateUrl: './colaborators.component.html',
  styleUrls: ['./colaborators.component.scss']
})
export class ColaboratorsComponent implements OnInit {
  emailCollab;
  @Input() collaboratorsUsers;
  @Output() save = new EventEmitter<any>();
  @Output() sendEmail = new EventEmitter<any>();
  constructor(private location: Location) { }

  ngOnInit(): void {
    
  }


  @Output() go_back_click = new EventEmitter<boolean>();

  click_Notif_GoBack(msg:boolean){
    this.go_back_click.emit(msg);
    this.location.back();
  }

  addCollab(){
    if(this.emailCollab.includes("@")){
      console.log("send");
      this.sendEmail.emit(this.emailCollab);
    }
  }

  saveChanges(){
    this.save.emit();
  }
}
