import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent  implements OnInit {

  constructor(
    private menuCtrl : MenuController,
    private userService : UserService
  ) { }

  menus = [
    {
      text: 'Home',
      route: '/home',
      icon: 'home-outline'
    },
    {
      text: 'Users',
      route: '/users',
      icon: 'person-outline'
    },
    // {
    //   text: 'Users Access',
    //   route: '/user-access',
    //   icon: 'lock-closed-outline'
    // },
    
  ]

  closeMenu() {
    console.log("Close menu")
    this.menuCtrl.close('user-menu')
  }

  

  ngOnInit() {}

}
