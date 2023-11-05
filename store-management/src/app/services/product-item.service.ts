import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { AddProductItemData } from '../interfaces/form-inputs';
import { Buffer } from 'buffer';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService {

  constructor() { }

  async addProductItem(data : AddProductItemData){
    const res = await axios.post(`${environment.apiUrl}products`, data)
    return res;
  }

  async uploadImage(data: any){
    const newData = Buffer.from(data.image)
    const res = await axios.post(`${environment.apiUrl}products/upload-image`, {
      image: newData
    }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res;
  }

  async imageReader(){
    const res = await axios.get(`${environment.apiUrl}products/read`)
    return res;
  }
}
