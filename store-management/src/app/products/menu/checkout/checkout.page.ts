import { Component, ErrorHandler, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput, IonTextarea, LoadingController, ToastController } from '@ionic/angular';
import { PlaceOrderData } from 'src/app/interfaces/form-inputs';
import { HelperService } from 'src/app/services/helper.service';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  constructor(
    private helperService : HelperService,
    private userService : UserService,
    private alertCtrl : AlertController,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private menuService : MenuService,
    private errorHandler : ErrorHandler,
    private router : Router
  ) { }

  checkout : any
  @ViewChild('tableNoInput') tableNoInput! : IonInput | any
  @ViewChild('notesInput') notesInput! : IonTextarea | any

  async ngOnInit() {
    this.checkout = this.helperService.getRouterNavState().checkout
  }

  async placeOrder(){
    const loader = await this.loadingCtrl.create({
      message: 'Saving Order',
      backdropDismiss: false,
      spinner: 'lines'
    })
    const toast = await this.toastCtrl.create({
      message: "Order created successfully",
      icon: 'checkmark-circle',
      duration: 2000
    })
    try {
      if(!await this.validateInputs()){
        return
      }
      const data = await this.prepareData()
      await loader.present()
      const res = this.menuService.placeOrderPOS(data)
      this.menuService.clearCart()
      this.router.navigate(['/menu'])
      await loader.dismiss()
      toast.present()
    } catch (error) {
      await loader.dismiss()
      console.log(error)
      this.errorHandler.handleError(error)
    }
    

  }

  async prepareData(){
    let _items = JSON.parse(JSON.stringify(this.checkout)).map((val:any)=>{
      val.product_item.imageData = null
      val.variant.imageData = null
      return val
    })
    const data : PlaceOrderData  = {
      items: _items,
      table_no : this.tableNoInput.el.value,
      notes: this.notesInput.el.value,
      user_id : await (await this.userService.getAuth()).id
    }
    console.log(this.checkout)
    _items = []
    return data
  }

  async validateInputs() : Promise<boolean>{
    const alert = await this.alertCtrl.create({
      header: 'Invalid Inputs',
      buttons: ["Ok"]
    })
    if(!this.tableNoInput.el.value || this.tableNoInput.el.value <= 0){
      alert.message = "Invalid Table No."
      await alert.present()
      return false
    }
    return true
  }

}
