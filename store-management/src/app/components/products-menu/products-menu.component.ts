import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-menu',
  templateUrl: './products-menu.component.html',
  styleUrls: ['./products-menu.component.scss'],
})
export class ProductsMenuComponent  implements OnInit {

  constructor() { }

  menus = [
    {
      text: 'Products',
      route: '/products',
      icon: 'fast-food-outline'
    },
    {
      text: 'Categories',
      route: '/product-category',
      icon: 'file-tray-stacked-outline'
    },
    {
      text: 'Dashboard',
      route: '/home',
      icon: 'grid-outline'
    },
  ]

  ngOnInit() {}

}
