import { Injectable } from '@angular/core';
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
export class SalesService {

  constructor() { }

  async monthly(month:number, year:number){
    const res = await axios.get(`${environment.apiUrl}sales/monthly?month=${month}&year=${year}`)
    return res;
  }
}
