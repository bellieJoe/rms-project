import { Injectable } from '@angular/core';
import axios from 'axios';
import { Buffer } from 'buffer';
import { AddProductVariantData } from '../interfaces/form-inputs';
import { environment } from 'src/environments/environment';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class ProductVariantService {

  constructor() { }

  async addVariant(data: AddProductVariantData){
    const newData = Buffer.from(data.image)
    const res = await axios.post(`${environment.apiUrl}product-variants`, {
      image: newData,
      product_item_id: data.product_item_id,
      price: data.price,
      description : data.description,
      name : data.name
    }, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res;
  }

  async getVariantsByProductItemId(id:number){
    const res = await axios.get(`${environment.apiUrl}product-variants/get-variants-by-product-item-id?product_item_id=${id}`)
    return res
  }
}