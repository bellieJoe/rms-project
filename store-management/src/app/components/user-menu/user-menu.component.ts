import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent  implements OnInit {

  constructor() { }

  menus = [
    {
      text: 'Users',
      route: '/users',
      icon: 'person-outline'
    },
    {
      text: 'Dashboard',
      route: '/home',
      icon: 'grid-outline'
    }
  ]

  ngOnInit() {}

}
