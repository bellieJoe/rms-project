import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput } from '@ionic/angular';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  constructor(
    private menuService : MenuService,
    private alertCtrl : AlertController,
    private router : Router
  ) { }

  @ViewChildren(IonInput) ionInputs! : QueryList<IonInput>
  cart : any[] = []
  checkout: any = []
  total : number = 0

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.checkout = []
    this.total = 0
    this.cart = this.menuService.getCart()
  }

  async clearCart(){
    const alert = await this.alertCtrl.create({
      header: 'Clear Confirmation',
      message: 'Are you sure you want to clear the cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: "Clear",
          role: 'destructive',
          handler: async()=>{
            this.menuService.clearCart()
            this.cart = []
          }
        }
      ]
    })
    await alert.present()
  }

  async addToCheckout(event: any, cart_item: any){
    if(event.detail.checked){
      this.checkout.push(cart_item)
    }
    if(!event.detail.checked){
      this.checkout = this.checkout.filter((val:any)=>{
        return val.variant.id != cart_item.variant.id
      })
    }
    this.computeTotalPrice()
    console.log(this.checkout)
  }

  computeTotalPrice() {
    
    if(!this.checkout || this.checkout.length <= 0){
      this.total = 0
      return
    }
    this.checkout.forEach((val:any, i:number)=>{
      this.ionInputs.forEach((input : any)=>{
        if(input.el.id == val.variant.id){
          this.checkout[i].quantity = input.el.value
        }
      })
    })
    this.total = 0
    this.checkout.forEach((val:any) => {
      this.total += (val.variant.price * val.quantity)
    })
  }

  async gotoCheckout(){
    await this.router.navigate(['/cart/checkout'], {
      state: {
        checkout : this.checkout
      }
    })
  }

}
