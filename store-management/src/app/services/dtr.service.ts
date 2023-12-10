import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { AddDtrData } from '../interfaces/form-inputs';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class DtrService {

  constructor() { }

  async addOrUpdate(data : AddDtrData){
    const res = await axios.post(`${environment.apiUrl}dtrs`, data)
    return res;
  }
  async getByDate(date:string, employee_id:number){
    const res = await axios.get(`${environment.apiUrl}dtrs/get-by-date?date=${encodeURI(date)}&employee_id=${employee_id}`)
    return res;
  }
}
