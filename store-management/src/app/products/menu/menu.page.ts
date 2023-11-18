import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private menuService : MenuService,
    private helperService : HelperService
  ) { }

  @ViewChild('categorySegment') categorySegment : IonSegment|any;
  selectedCategory : any
  products : any = []
  menu : any

  async ngOnInit() {
    this.menu = await this.menuService.initializeMenu()
    await this.initImages()
    this.selectedCategory = this.menu[0].id
    this.products = this.menu[0].productItems
  }

  async initImages(){
    this.menu.forEach((category : any, i : number) => {
      const items = category.productItems
      items.forEach(async (item : any, j:number) => {
        const image = await this.helperService.readImage(this.menu[i].productItems[j].image)
        this.menu[i].productItems[j].imageData = image.data
        this.menu[i].productItems[j].price = 0
        item.productVariants.forEach(async (variant:any, k:number) => {
          const image = await this.helperService.readImage(this.menu[i].productItems[j].productVariants[k].image)
          this.menu[i].productItems[j].productVariants[k].imageData = image.data
          if(this.menu[i].productItems[j].price == 0 || this.menu[i].productItems[j].price > this.menu[i].productItems[j].productVariants[k].price){
            this.menu[i].productItems[j].price = this.menu[i].productItems[j].productVariants[k].price
          }
        })
      })
    })
  }

  categorySelect(ev : any){
    this.menu.forEach((val : any) => {
      if(val.id == ev.detail.value){
        this.products = val.productItems
      }
    })
  }

  async handleRefresh(event : any){
    this.menu = await this.menuService.initializeMenu()
    await this.initImages()
    this.menu.forEach((val : any) => {
      if(val.id == this.categorySegment.value){
        this.products = val.productItems
      }
    })
    event.target.complete()
  }

}
