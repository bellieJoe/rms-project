import { Injectable } from '@angular/core';
import { AddEquipmentItemData, AddSUpplyStocksData, AddSupplyItemData, EditEquipmentItemData, EditSupplyItemData } from '../interfaces/form-inputs';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ErrorHandler } from 'ionicons/dist/types/stencil-public-runtime';
import { ErrorHandlerService } from './error-handler.service';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private errorHandler : ErrorHandlerService
  ) { }

  eq_page : number = 1
  page : number = 1
  supplyItems : any = []
  equipmentItems : any = []

  async storeSupplyItem(data : AddSupplyItemData){
    const res = await axios.post(`${environment.apiUrl}inventory/store-supply-item`, data)
    return res
  }

  async addSupplyStocks(data : AddSUpplyStocksData){
    const res = await axios.post(`${environment.apiUrl}inventory/add-supply-stocks`, data)
    return res
  }

  async updateSupplyItem(data : EditSupplyItemData){
    const res = await axios.put(`${environment.apiUrl}inventory/edit-supply-item`, data)
    return res
  }

  async fetchSupplyItems():Promise<any>{
    if(this.page == 1){
      this.supplyItems = []
    }
    try {
      const res = await axios.get(`${environment.apiUrl}inventory/supply-items?page=${this.page}`)
      this.supplyItems = [...this.supplyItems, ...res.data]
      this.page++
      return res
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async searchSupplyItemByName(keyword:number){
    const res = await axios.get(`${environment.apiUrl}inventory/search-supply-items-by-name?keyword=${keyword}`)
    return res;
  }

  async getSupplyStocksBySupplyItemId(supply_item_id:number){
    const res = await axios.get(`${environment.apiUrl}inventory/supply-stocks-by-supply-item-id?supply_item_id=${supply_item_id}`)
    return res;
  }

  async storeEquipmentItem(data : AddEquipmentItemData){
    const res = await axios.post(`${environment.apiUrl}inventory/equipments`, data)
    return res
  }

  async fetchEquipmentItem() : Promise<any>{
    if(this.eq_page == 1){
      this.equipmentItems = []
    }
    try {
      const res = await axios.get(`${environment.apiUrl}inventory/equipments?page=${this.eq_page}`)
      this.equipmentItems = [...this.equipmentItems, ...res.data]
      this.eq_page++
      return res
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async searchEquipmentItemByName(keyword:number){
    const res = await axios.get(`${environment.apiUrl}inventory/equipments/search-items-by-name?keyword=${keyword}`)
    return res;
  }

  async updateEquipmentItem(data : EditEquipmentItemData){
    const res = await axios.put(`${environment.apiUrl}inventory/equipments/edit-item`, data)
    return res
  }

}
