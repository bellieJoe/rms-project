import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';

import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  items : any = [
    {
      title: "Users",
      subtitle: "Lorem ipsum dolor sit.",
      icon: 'enter',
      route: '/users',
      image: '../../assets/images/users.jpg'
    },
    {
      title: "Products",
      subtitle: "Lorem ipsum dolor sit.",
      icon: 'enter',
      route: '/products',
      image: '../../assets/images/products.jpg'
    },
    {
      title: "Inventory",
      subtitle: "Lorem ipsum dolor sit.",
      icon: 'enter',
      route: '/inventory',
      image: '../../assets/images/inventory.jpg'
    },
    {
      title: "Payroll",
      subtitle: "Lorem ipsum dolor sit.",
      icon: 'enter',
      route: '/payroll',
      image: '../../assets/images/employee.jpg'
    },

  ]



}
