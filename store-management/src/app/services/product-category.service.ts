import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AddProductCategoryData, AddUserData, UpdateProductCategoryData } from '../interfaces/form-inputs'
import { AbstractControl, ValidationErrors } from '@angular/forms';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor() { }

  async addProductCategory(data: AddProductCategoryData){
    const res = await axios.post(`${environment.apiUrl}product-categories`, data)
    return res;
  }

  async updateProductCategory(data: UpdateProductCategoryData){
    console.log(data)
    const res = await axios.put(`${environment.apiUrl}product-categories/update/${data.id}`, data)
    return res;
  }

  async fetchCategories(page:number){
    const res = await axios.get(`${environment.apiUrl}product-categories/?page=${page}`)
    return res;
  }

  async searchCategoryByName(keyword:number){
    const res = await axios.get(`${environment.apiUrl}product-categories/search-by-name?keyword=${keyword}`)
    return res;
  }

  async active(){
    const res = await axios.get(`${environment.apiUrl}product-categories/active`)
    return res;
  }
}
