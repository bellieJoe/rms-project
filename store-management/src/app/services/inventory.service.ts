import { Injectable } from '@angular/core';
import { AddSupplyItemData } from '../interfaces/form-inputs';
import axios from 'axios';
import { environment } from 'src/environments/environment';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() { }

  async storeSupplyItem(data : AddSupplyItemData){
    const res = await axios.post(`${environment.apiUrl}inventory/store-supply-item`, data)
    return res
  }
}
