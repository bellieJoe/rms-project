import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSettingsService } from '../services/app-settings.service';
import { FormBuilder, Validators } from '@angular/forms';
import { EditAppSettingsData } from '../interfaces/form-inputs';
import { LoadingController } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.page.html',
  styleUrls: ['./app-settings.page.scss'],
})
export class AppSettingsPage implements OnInit {

  constructor(
    private appSettingsService :  AppSettingsService,
    private fb : FormBuilder,
    private loadingCtrl : LoadingController
  ) { }

  @ViewChild('coordinate_selector_modal') coordinateSelectorModal! : IonModal
  appSettings  : any = {}
  edit_app_settings_form = this.fb.group({
    id: ['', [Validators.required]],
    deliveryRadiusM: ['', [Validators.required]],
    deliveryExcessChargePerMinute: ['', [Validators.required]],
    deliveryCharge: ['', [Validators.required]],
    normalDeliveryDurationM: ['', [Validators.required]],
    storeLocation : [{
      lat: 0, long: 0
    }, [Validators.required]]
  })

  
  public get id()  {
    return this.edit_app_settings_form.get('id')
  }
  public get deliveryRadiusM()  {
    return this.edit_app_settings_form.get('deliveryRadiusM')
  }
  public get deliveryExcessChargePerMinute()  {
    return this.edit_app_settings_form.get('deliveryExcessChargePerMinute')
  }
  public get deliveryCharge()  {
    return this.edit_app_settings_form.get('deliveryCharge')
  }
  public get storeLocation()  {
    return this.edit_app_settings_form.get('storeLocation')
  }
  public get storeLocationString()  {
    return `lat: ${this.edit_app_settings_form.get('storeLocation')?.value?.lat}, lng: ${this.edit_app_settings_form.get('storeLocation')?.value?.long}`
  }
  public get normalDeliveryDurationM()  {
    return this.edit_app_settings_form.get('normalDeliveryDurationM')
  }
  

  async ngOnInit() {
    this.appSettings = await this.appSettingsService.fetch()
    this.edit_app_settings_form.patchValue({
      id: this.appSettings.id,
      deliveryCharge: this.appSettings.delivery_charge,
      deliveryRadiusM: this.appSettings.delivery_radius_m,
      deliveryExcessChargePerMinute: this.appSettings.delivery_excess_charge_per_minute,
      normalDeliveryDurationM: this.appSettings.normal_delivery_duration_m,
      storeLocation: this.appSettings.json_store_location,
    })
  }

  async update(){
    const loader = await this.loadingCtrl.create({
      message: 'Updating App Settings',
      backdropDismiss: false
    })
    await loader.present()
    const data : EditAppSettingsData = {
      delivery_charge: parseInt(this.deliveryCharge?.value!),
      delivery_excess_charge_per_minute: parseInt(this.deliveryExcessChargePerMinute?.value!),
      delivery_radius_m: parseInt(this.deliveryRadiusM?.value!),
      normal_delivery_duration_m: parseInt(this.normalDeliveryDurationM?.value!),
      store_location: {
        lat: (this.storeLocation?.value!.lat!).toString(),
        long: (this.storeLocation?.value!.long!).toString(),
      },
      id: parseInt(this.id?.value!)
    }
    await this.appSettingsService.update(data)
    await this.ngOnInit()
    await loader.dismiss()
  }

  async selectCoordinates(){
    await this.coordinateSelectorModal.present()
  }

  async setCoordinates(event:any){
    console.log(event)
    this.storeLocation?.setValue(event)
  }

}
