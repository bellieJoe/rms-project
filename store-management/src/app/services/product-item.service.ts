import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { AddProductItemData, ImageUploadData } from '../interfaces/form-inputs';
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

  async uploadImage(data: ImageUploadData){
    const newData = Buffer.from(data.image)
    const res = await axios.post(`${environment.apiUrl}products/upload-image`, {
      image: newData,
      id: data.id
    }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res;
  }

  async imageReader(url : string){
    const res = await axios.get(`${environment.apiUrl}products/read-image?url=${url}`)
    return res;
  }

  async fetchProducts(page:number){
    const res = await axios.get(`${environment.apiUrl}products/active?page=${page}`)
    return res;
  }

  async searchProductByName(keyword:number){
    const res = await axios.get(`${environment.apiUrl}products/search-by-name?keyword=${keyword}`)
    return res;
  }
}
