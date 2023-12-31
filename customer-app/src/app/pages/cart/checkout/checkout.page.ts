import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput, IonSelect, IonTextarea, LoadingController, ToastController } from '@ionic/angular';
import { IonModal, ModalController } from '@ionic/angular/common';
import { Coordinates, PlaceOrderData } from 'src/app/interfaces/form-inputs';
import { AppSettingsService } from 'src/app/services/app-settings.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { HelperService } from 'src/app/services/helper.service';
import { MapService } from 'src/app/services/map.service';
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
    private errorHandler : ErrorHandlerService,
    private router : Router,
    private modalCtrl : ModalController,
    private mapService : MapService,
    private appSettingsService : AppSettingsService
    
  ) { 
    
  }

  checkout : any
  addresses_suggestions: any = []
  delivery_types : any = []
  selectedDelivery : any = 3
  selectedAddress : any = null
  deliveryCharge : number = 0
  location : Coordinates = {
    lat: '0',
    long: '0'
  }
  @ViewChild('address') address! : IonInput | any
  @ViewChild('deliveryMode') deliveryModeInput! : IonSelect | any
  @ViewChild('notesInput') notesInput! : IonTextarea | any
  @ViewChild('address_selector') addressSelector! : IonModal


  @ViewChild('map_modal') mapModal! : IonModal

  
  onSelectDelivery(){
    this.selectedDelivery = this.deliveryModeInput.value
  }

  async ngOnInit() {
    this.checkout = this.helperService.getRouterNavState().checkout
    try {
      this.delivery_types = (await this.menuService.getDeliveryTypes()).data
    } catch (error) {
      this.errorHandler.handleError(error)
    }
    await this.appSettingsService.fetch()
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
      const res = this.menuService.placeOrderOnline(data)
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
      address : this.selectedAddress,
      notes: this.notesInput.el.value,
      user_id : await (await this.userService.getAuth()).id,
      delivery_type_id: this.selectedDelivery,
      location: this.location,
      delivery_charge: this.deliveryCharge
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
    if(!this.selectedDelivery){
      alert.message = "Please Select Delivery Mode"
      await alert.present()
      return false
    }
    if(this.selectedDelivery == 1){
      if(!this.location || this.location.lat != '0' || this.location.long != '0'){
        alert.message = "Invalid Location."
        await alert.present()
        return false
      }
    }
    return true
  }

  async selectDeliveryAddress(){
    await this.addressSelector.present()
  }

  // async address_selected(ev:any){
  //   console.log(ev)
  //   this.selectedAddress = ev
  //   await this.modalCtrl.dismiss()
  //   const res = await this.mapService.computeDistance('Poras, Boac, Marinduque', ev)
  //   this.deliveryCharge = this.computeDeliveryCharge(res.duration)
  // }

  async coordinates_selected(coordinates:any){
    this.selectedAddress = await this.mapService.getAddressFromCoordinates(coordinates.lat, coordinates.lng)
    this.selectedAddress = this.selectedAddress.display_name
    const toast = await this.toastCtrl.create({
      message: "Coordinates changed",
      duration: 700,
      color: 'success'
    })
    this.location.lat = coordinates.lat
    this.location.long = coordinates.lng
    const test = await this.mapService.getAddressFromCoordinates(this.location.lat, this.location.long)
    console.log(test.display_name)
    const start : Coordinates = {
      lat: this.appSettingsService.appSettings.json_store_location.lat,
      long: this.appSettingsService.appSettings.json_store_location.long
    }
    const duration = await this.mapService.compunteDistanceByCoordinates(start, this.location)
    this.deliveryCharge = await this.mapService.computeDeliveryCharge(duration.duration)
    toast.present()
  }

  async selectCoordinates(){
    await this.mapModal.present()
  }

  closeMapModal(){
    this.mapModal.dismiss()
  }

  async searchAddress(ev:any){
    console.log(ev.detail.value)
    const addresses = await this.mapService.getAddressSuggestion(ev.detail.value)
    this.addresses_suggestions = addresses
    console.log(addresses)
  }

  async address_searchbar_clear(){
    this.addresses_suggestions = []
  }

  async address_searchbar_selected(place:any){
    console.log(place)
    const coordinates = {
      lat: place.lat,
      lng : place.lon
    }
    this.coordinates_selected(coordinates)
    this.address_searchbar_clear()
  }



}
