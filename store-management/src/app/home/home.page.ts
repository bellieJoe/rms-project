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
      icon: 'enter'
    },
    {
      title: "Products",
      subtitle: "Lorem ipsum dolor sit.",
      icon: 'enter'
    },
    {
      title: "Inventory",
      subtitle: "Lorem ipsum dolor sit.",
      icon: 'enter'
    },

  ]



}
