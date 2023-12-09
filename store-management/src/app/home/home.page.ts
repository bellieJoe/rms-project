import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';

import { DataService, Message } from '../services/data.service';
import { UserService } from '../services/user.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private userService : UserService,
    private router : Router
  ) {}

  items : any = [
    {
      title: "Users",
      subtitle: "Lorem ipsum dolor sit.",
      icon: 'enter',
      route: '/users',
      image: '../../assets/images/users.jpg'
    },
    {
      title: "Store",
      subtitle: "Lorem ipsum dolor sit.",
      icon: 'enter',
      route: '/products',
      image: '../../assets/images/products.jpg'
    },
  {
      title: "Inventory",
      subtitle: "Lorem ipsum dolor sit.",
      icon: 'enter',
      route: '/supply-inventory',
      image: '../../assets/images/inventory.jpg'
    },
    {
      title: "Employee Portal",
      subtitle: "Lorem ipsum dolor sit.",
      icon: 'enter',
      route: '/employees',
      image: '../../assets/images/employee.jpg'
    },

  ]

  public actionSheetButtons = [
    {
      text: 'Profile',
      role: 'destructive',
      icon: 'person-outline',
      
    },
    {
      text: 'App Settings',
      icon: 'options',
      handler: async () => {
        this.router.navigate(['/app-settings'])
      }
    },
    {
      text: 'Logout',
      icon: 'log-out-outline',
      data: {
        action: 'share',
      },
      handler: async () => {
        await this.userService.logout()
      }
    },
    {
      text: 'Cancel',
      role: 'cancel',
      icon: 'close-outline',
      data: {
        action: 'cancel',
      },
    },
  ];



}
