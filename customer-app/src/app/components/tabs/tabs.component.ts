import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent  implements OnInit {

  constructor(
    public menuService : MenuService
  ) { }

  cartCount : any

  ngOnInit() {
    this.cartCount = this.menuService.countCart()
  }

}
