import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AddToCartData, AddUserData, PlaceOrderData } from '../interfaces/form-inputs'
import { AbstractControl, ValidationErrors } from '@angular/forms';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private errorHandler : ErrorHandlerService
  ) { }

  async initializeMenu(){
    try {
      const res = await axios.get(`${environment.apiUrl}menu/init`)
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error)
      this.errorHandler.handleError(error)
    }
  }

  async initializeRecommendation(){
    try {
      const res = await axios.get(`${environment.apiUrl}menu/generate-recommendations`)
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error)
      this.errorHandler.handleError(error)
    }
  }

  async addToCart(data : AddToCartData){
    const _cart = this.getCart()
    if(!_cart || _cart.length <= 0){
      this.setCart([
        {
          variant : data.variant,
          quantity: data.quantity,
          product_item: data.product_item
        }
      ])
      return
    }
    let hasDuplicate = false
    let cart = _cart.map((val:any, i:number)=>{
      if(val.variant.id == data.variant.id){
        val.quantity += data.quantity
        hasDuplicate = true
        return val;
      }
      return val
    })
    if(!hasDuplicate){
      cart.push(
        {
          variant : data.variant,
          quantity: data.quantity,
          product_item: data.product_item
        }
      )
    }
    this.setCart(cart)
    console.log(this.getCart())
  }

  getCart(){
    return JSON.parse(localStorage.getItem('cart')!)
  }

  setCart(data:any){
    localStorage.setItem('cart', JSON.stringify(data))
  }

  countCart(){
    const cart = this.getCart()
    return cart ? cart.length : 0
  }

  clearCart(){
    localStorage.removeItem('cart')
  }
  
  async placeOrderPOS(data: PlaceOrderData){
    const res = await axios.post(`${environment.apiUrl}menu/place-order-pos`, data)
    return res
  }
}
