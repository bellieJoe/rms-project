import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AddToCartData, AddUserData, FetchOrdersData, PlaceOrderData } from '../interfaces/form-inputs'
import { AbstractControl, ValidationErrors } from '@angular/forms';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  constructor() { }

  async fetchOrders(data:FetchOrdersData) {
    const res = await axios.get(`${environment.apiUrl}orders`, {
      params: data
    })
    return res
  }

  async posMarkAsCompleted(order_id : number) {
    const res = await axios.post(`${environment.apiUrl}orders/pos-completed`, {
      order_id : order_id
    })
    return res
  }

  async fetchItems(order_id : number) {
    const res = await axios.get(`${environment.apiUrl}orders/fetch-items?order_id=${order_id}`)
    return res
  }

  async cancelOrder(order_id : number) {
    const res = await axios.put(`${environment.apiUrl}orders/store-cancel?order_id=${order_id}`)
    return res
  }

  async processOrder(order_id : number) {
    const res = await axios.put(`${environment.apiUrl}orders/store-process?order_id=${order_id}`)
    return res
  }

  async markAsDelivery(order_id : number) {
    const res = await axios.put(`${environment.apiUrl}orders/mark-as-delivery?order_id=${order_id}`)
    return res
  }

  async markAsReadyForDelivery(order_id : number) {
    const res = await axios.put(`${environment.apiUrl}orders/mark-as-ready-for-delivery?order_id=${order_id}`)
    return res
  }
}
