import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-menu',
  templateUrl: './test-menu.component.html',
  styleUrls: ['./test-menu.component.scss'],
})
export class TestMenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  menus = [
    {
      text: 'Users',
      route: '/users',
      icon: 'person-outline'
    },
    {
      text: 'Users Access',
      route: '/users/user-access',
      icon: 'lock-closed-outline'
    },
    {
      text: 'Dashboard',
      route: '/home',
      icon: 'grid-outline'
    }
  ]

}
