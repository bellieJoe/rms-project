import { Injectable } from '@angular/core';
import axios from 'axios';
import { CancelOrderData, FetchOrdersData } from '../interfaces/form-inputs';
import { environment } from 'src/environments/environment';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  async fetchOrders(data:FetchOrdersData) {
    const res = await axios.get(`${environment.apiUrl}orders/customer-orders`, {
      params: data
    })
    return res
  }

  async fetchItems(order_id : number) {
    const res = await axios.get(`${environment.apiUrl}orders/fetch-items?order_id=${order_id}`)
    return res
  }

  async cancelOrder(data : CancelOrderData) {
    const res = await axios.post(`${environment.apiUrl}orders/customer-cancel`, data)
    return res
  }
}
