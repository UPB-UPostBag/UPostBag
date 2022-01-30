import { Component, OnInit } from '@angular/core';
import { ShoppingList } from 'src/app/service/models/shopping-list.model';
import { AuthService } from '../../../service/firebase/auth.service';
import { DatabaseService } from '../../../service/firebase/database.service';
import { ColaboratorsComponent } from '../colaborators/colaborators.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { classicNameResolver } from 'typescript';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {
  actualUser;
  allShoppingLists: ShoppingList[];
  redirectTo: Boolean = false;
  more_was_clicked: boolean = false;
  goBack: boolean = false;
  outgoingdata = [
    {
      title: 'Iron Man',
      icon: 'pan_tool',
      img: '/assets/ironman.jpg',
      description: 'Iron Man is a fictional superhero.',
      data: {
        name: 'Tony Stark',
        abilities: [
          'Flying', 'Shooting', 'billionaire'
        ]
      }
    },
    {
      title: 'Capton America',
      icon: 'view_stream',
      img: '/assets/captainamerica.jpg',
      description: 'Captain America is the alter ego of Steve Rogers.',
      data: {
        name: 'Steve Rogers',
        abilities: [
          'Strong', 'Very Strong'
        ]
      }
    },
    {
      title: 'Dr Strange',
      icon: 'offline_bolt',
      img: '/assets/drstange.jpg',
      description: 'He is a master of Mystic Art',
      data: {
        name: 'Steven Strange',
        abilities: [
          'Mystic Art'
        ]
      }
    },
    {
      title: 'Shaktiman',
      icon: 'flash_on',
      img: '/assets/shatiman.jpg',
      description: 'Shaktimaan is an Indian fictional superhero.',
      data: {
        name: 'Pandit Gangadhar',
        abilities: [
          'Attractive male', 'Healing', 'Will power-based constructs', 'Flying'
        ]
      }
    },
    {
      title: 'The Winter Soldier',
      icon: 'trending_up',
      img: '/assets/wintersoldier.jpg',
      description: 'Barnes grew up as an Army brat. ',
      data: {
        name: 'James Buchanan "Bucky" Barnes',
        abilities: [
          'Hand to hand combat and Martial arts', 'Strong Arm'
        ]
      }
    },
    {
      title: 'The Batman',
      icon: 'attach_money',
      img: '/assets/batman.jpg',
      description: 'Batman does not possess any superpowers.',
      data: {
        name: 'Bruce wayne',
        abilities: [
          'Rich', 'Strong'
        ]
      }
    },
    {
      title: 'The Superman',
      icon: 'send',
      img: '/assets/superman.jpg',
      description: 'He is from krypton.',
      data: {
        name: 'Clark Kent',
        abilities: [
          'Attractive male', 'Healing', 'Will power-based constructs', 'Flying'
        ]
      }
    }
  ];

  constructor(private authSvc: AuthService, private databaseSvc: DatabaseService) { }

  ngOnInit() {
    this.actualUser = JSON.parse(localStorage.getItem('user'));
    this.getAllList();
  }

  login() {
    this.authSvc.onLoginGoogle();
  }

  getAllList() {
    this.databaseSvc.getAllList().subscribe(res => {
      this.allShoppingLists = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as ShoppingList;
      })
    });
  }

  removeList(list) {
    if (confirm("Esta seguro de eliminar" + list.name)) {
      this.databaseSvc.deleteList(list);
    }
  }

  goBackClicked(confirmation: boolean) {
    this.goBack = confirmation;
    console.log(this.goBack);

    //hacer genkidama si es true
    if (this.goBack) {
      this.redirectTo = false;
    }
  }
  deletedItem(event: any) {
    console.log(event)
  }
}









