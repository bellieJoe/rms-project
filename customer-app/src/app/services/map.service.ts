import { Injectable } from '@angular/core';
import { Coordinates } from '../interfaces/form-inputs';
import { ErrorHandlerService } from './error-handler.service';
import { AppSettingsService } from './app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {


  OPEN_ROUTER_SERVICE_KEY = '5b3ce3597851110001cf6248b4982754d6e7435da869f0cf9903018b'
  constructor(
    private errorHandler : ErrorHandlerService,
    private appSettingsService : AppSettingsService
  ) { }

  async getCoordinates(address : string){
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURI(address)}&format=json`)
      const _res = await res.json()
      console.log(_res)
      return _res
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async computeDistance(address1: string, address2: string ){
    const start : Coordinates = {
      long: '',
      lat: ''
    }
    const end : Coordinates = {
      long: '',
      lat: ''
    }
    try {
      const place1 = (await this.getCoordinates(address1))[0]
      start.long = place1.lon
      start.lat = place1.lat
      const place2 = (await this.getCoordinates(address2))[0]
      end.long = place2.lon
      end.lat = place2.lat
      const _res = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${this.OPEN_ROUTER_SERVICE_KEY}&start=${start.long},${start.lat}&end=${end.long},${end.lat}`)
      const res = await _res.json()
      return res.features[0].properties.segments[0]
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async compunteDistanceByCoordinates(start:Coordinates,end:Coordinates){
    try {
      const _res = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${this.OPEN_ROUTER_SERVICE_KEY}&start=${start.long},${start.lat}&end=${end.long},${end.lat}`)
     
      const res = await _res.json()
      if(_res.status >= 400){
        throw new Error(res.error.message)
      }
      return res.features[0].properties.segments[0]
    } catch (error) {
      this.errorHandler.handleError(new Error('Unable to compute Delivery Fee base on the location'))
      // this.errorHandler.handleError(error)
    }
  }

  async getAddressSuggestion(q:string){
    try {
      const _res = await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json`)
      return await _res.json()
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async test(){
    const res = await this.getAddressSuggestion('bantad')
    console.log(res)
  }

  async computeDeliveryCharge(duration: number){
    await this.appSettingsService.fetch()

    const durInMin = duration / 60
    if(durInMin <= this.appSettingsService.appSettings.normal_delivery_duration_m){
      return this.appSettingsService.appSettings.delivery_charge
    }

    return Math.floor(((durInMin - this.appSettingsService.appSettings.normal_delivery_duration_m) * this.appSettingsService.appSettings.delivery_excess_charge_per_minute ) + this.appSettingsService.appSettings.delivery_charge)
  }

  // {lat: 13.445129645583702, lng: 121.82986567866539}

  async getAddressFromCoordinates(lat:any, lng:any){
    try {
      const _res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      return await _res.json()
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }
  
}


