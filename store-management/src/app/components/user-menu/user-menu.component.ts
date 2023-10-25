import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent  implements OnInit {

  constructor(
    private menuCtrl : MenuController
  ) { }

  menus = [
    {
      text: 'Users',
      route: '/users',
      icon: 'person-outline'
    },
    {
      text: 'Users Access',
      route: '/user-access',
      icon: 'lock-closed-outline'
    },
    {
      text: 'Dashboard',
      route: '/home',
      icon: 'grid-outline'
    },
    {
      text: 'Logout',
      route: '/home',
      icon: 'log-out-outline'
    }
  ]

  closeMenu() {
    console.log("Close menu")
    this.menuCtrl.close('user-menu')
  }

  ngOnInit() {}

}
