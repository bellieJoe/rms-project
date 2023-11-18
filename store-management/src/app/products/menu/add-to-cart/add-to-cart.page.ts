import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AlertController, IonInput, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.page.html',
  styleUrls: ['./add-to-cart.page.scss'],
})
export class AddToCartPage implements OnInit {

  constructor(
    private navParams: NavParams, 
    private modalController: ModalController,
    private alertCtrl : AlertController
    ) {
    
   }

  @ViewChild('quantityEl', { static: true }) quantityEl: IonInput|any;
  item : any
  selectedVariant : any
  price : any
  total : any = 0

  ngOnInit() {
    this.item = this.navParams.get('item')
    console.log(this.item)
  }

  async close(){
    this.modalController.dismiss()
  }

  async selectVariant(variant:any){
    this.selectedVariant = variant
    this.price = variant.price
    this.computeTotalPrice()
  }

  async quantityChange(ev:any){
    const value = ev.target!.value;
    console.log(Math.round(value))
    let newValue = Math.round(value)
    this.quantityEl.value = newValue
    this.computeTotalPrice()
  }

  async addToCart(){
    if(!this.selectedVariant){
      const alert = await this.alertCtrl.create({
        header: "Incomplete Data",
        message: 'Please select a variant',
        buttons: ["Ok"]
      })
      await alert.present()
      return
    }
    if(!this.quantityEl.value || this.quantityEl.value <= 0){
      const alert = await this.alertCtrl.create({
        header: "Incomplete Data",
        message: 'Please enter order quantity',
        buttons: ["Ok"]
      })
      await alert.present()
    }
    console.log({
      variant : this.selectedVariant,
      quantity: this.quantityEl.value,
    })
  }

  async computeTotalPrice(){
    if(!this.selectedVariant || !this.quantityEl.value || this.quantityEl.value <= 0){
      return
    }
    const total = this.selectedVariant.price * this.quantityEl.value
    this.total = total
  }

}
