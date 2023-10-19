import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  constructor() { }

  menus = [
    {
      text: 'Users',
      route: '/users'
    }
  ]

  ngOnInit() {
  }

}
