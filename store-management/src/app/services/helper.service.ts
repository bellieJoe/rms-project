import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import {Location} from '@angular/common'

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private router : Router,
    private location : Location
  ) { }


  getRouterNavState() : any{
    if(!this.router.getCurrentNavigation()?.extras.state ){
      location.href = "/";
    }
    return this.router.getCurrentNavigation()?.extras.state;
  }

  async readImage(url:string){
    const res = await axios.get(`${environment.apiUrl}products/read-image?url=${url}`)
    return res;
  }

  navigateback(){
    this.location.back()
  }
}
