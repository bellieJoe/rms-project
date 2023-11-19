import { Component, OnInit, Input, ViewChild, ErrorHandler } from '@angular/core';
import { AlertController, IonInput, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.page.html',
  styleUrls: ['./add-to-cart.page.scss'],
})
export class AddToCartPage implements OnInit {

  constructor(
    private navParams: NavParams, 
    private modalController: ModalController,
    private alertCtrl : AlertController,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private menuService : MenuService,
    private errorHandler : ErrorHandler
    ) {
    
   }

  @ViewChild('quantityEl', { static: true }) quantityEl: IonInput|any;
  item : any
  selectedVariant : any
  price : any
  total : any = 0
  cartCount : number = this.menuService.countCart()

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
    const loader = await this.loadingCtrl.create({
      message: "Adding product to cart",
      backdropDismiss: false,
      spinner: 'circular'
    })
    const toast = await this.toastCtrl.create({
      icon: 'checkmark',
      message: 'Product successfully saved',
      duration: 3000
    })
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
    try {
      await loader.present()
      this.menuService.addToCart({
        variant : this.selectedVariant,
        quantity: this.quantityEl.value,
        product_item: this.item
      })
      await loader.dismiss()
      this.modalController.dismiss()
      toast.present()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
    this.cartCount = this.menuService.countCart()
  }

  async computeTotalPrice(){
    if(!this.selectedVariant || !this.quantityEl.value || this.quantityEl.value <= 0){
      return
    }
    const total = this.selectedVariant.price * this.quantityEl.value
    this.total = total
  }

}
