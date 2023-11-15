import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private menuService : MenuService
  ) { }

  selectedCategory : any
  products : any = []
  menu : any
  async ngOnInit() {
    this.menu = await this.menuService.initializeMenu()
    this.selectedCategory = this.menu[0].id
    this.products = this.menu[0].productItems
    console.log(this.selectedCategory)
  }

  categorySelect(ev : any){
    console.log(ev.detail.value)
    this.menu.forEach((val : any) => {
      if(val.id == ev.detail.value){
        this.products = val.productItems
      }
    })
  }

}
