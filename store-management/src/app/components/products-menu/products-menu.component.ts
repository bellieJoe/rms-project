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
      text: 'Home',
      route: '/home',
      icon: 'home-outline'
    },
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
      text: 'Sales',
      route: '/sales',
      icon: 'bar-chart-outline'
    },
    // {
    //   text: 'Menu',
    //   route: '/menu',
    //   icon: 'grid-outline'
    // },
    
  ]

  ngOnInit() {}

}
