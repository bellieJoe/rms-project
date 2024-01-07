import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSegment, ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { MenuService } from 'src/app/services/menu.service';
import { AddToCartPage } from './add-to-cart/add-to-cart.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private menuService : MenuService,
    private helperService : HelperService,
    private modalCtrl : ModalController,
    private router : Router
  ) { }

  @ViewChild('categorySegment') categorySegment : IonSegment|any;
  selectedCategory : any = 'recommended'
  products : any = []
  menu : any
  cartCount: number = this.menuService.countCart()
  recommendations : any = {}

  async ngOnInit() {
    this.menu = await this.menuService.initializeMenu()
    this.recommendations = await this.menuService.initializeRecommendations()
    await this.initImages()
    console.log(this.recommendations)
    this.selectedCategory = 'recommended'
    this.products = []
  }

  ionViewDidEnter(){
    this.cartCount = this.menuService.countCart()
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
    this.recommendations.best_sellers.forEach(async (item : any, j:number) => {
      const image = await this.helperService.readImage(item.image)
      this.recommendations.best_sellers[j].imageData = image.data
      this.recommendations.best_sellers[j].price = 0
      item.productVariants.forEach(async (variant:any, k:number) => {
        const image = await this.helperService.readImage(variant.image)
        this.recommendations.best_sellers[j].productVariants[k].imageData = image.data
        if(this.recommendations.best_sellers[j].price == 0 ||this.recommendations.best_sellers[j].price > this.recommendations.best_sellers[j].productVariants[k].price){
          this.recommendations.best_sellers[j].price = this.recommendations.best_sellers[j].productVariants[k].price
        }
      })
    })
  }

  categorySelect(ev : any){
    this.selectedCategory = ev.detail.value
    if(ev.detail.value == 'recommended'){
      this.products = []
      return
    }
    this.menu.forEach((val : any) => {
      if(val.id == ev.detail.value){
        this.products = val.productItems
      }
    })
  }

  async handleRefresh(event : any){
    if(this.categorySegment.value == 'recommended'){
      this.products = []
      return
    }
    this.menu = await this.menuService.initializeMenu()
    this.recommendations = await this.menuService.initializeRecommendations()
    await this.initImages()
    this.menu.forEach((val : any) => {
      if(val.id == this.categorySegment.value){
        this.products = val.productItems
      }
    })
    event.target.complete()
  }

  async addToCart(item:any){
    console.log("Add to cart")
    const modal = await this.modalCtrl.create({
      component: AddToCartPage,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      componentProps: {item: item}
    })
    console.log(item)

    await modal.present()
    await modal.onDidDismiss()
    this.cartCount = this.menuService.countCart()
  }

  async viewCart(){
    await this.router.navigate(['/menu/cart'])
  }

}
