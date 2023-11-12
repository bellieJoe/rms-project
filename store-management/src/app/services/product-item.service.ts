import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { AddProductItemData, ImageUploadData, UpdateProductItemData } from '../interfaces/form-inputs';
import { Buffer } from 'buffer';
import { ErrorHandlerService } from './error-handler.service';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService {

  constructor(
    private errorHandler : ErrorHandlerService
  ) { }

  page : number = 1
  products : any = []

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

  async fetchProducts(){
    if(this.page == 1){
      this.products = []
    }
    try {
      const res = await axios.get(`${environment.apiUrl}products/active?page=${this.page}`)
      this.products = [...this.products, ...res.data]
      this.page++
    } catch (error) {
      console.log(error)
      this.errorHandler.handleError(error)
    }
  }

  async searchProductByName(keyword:number){
    const res = await axios.get(`${environment.apiUrl}products/search-by-name?keyword=${keyword}`)
    return res;
  }

  async updateProductItem(data : UpdateProductItemData){
    const res = await axios.put(`${environment.apiUrl}products/update`, data)
    return res;
  }

  async getById(id : number){
    const res = await axios.get(`${environment.apiUrl}products/get-by-id?id=${id}`)
    return res;
  }
}
