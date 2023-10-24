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
export class UserService {

  constructor() { }

  // async login(data : any) : Promise<any> {
  //   const res = await axios.post(`${environment.apiUrl}/users/signin`, data)
  //   .then(res => res)
  //   .catch(err => err.response)
  //   return res;
  // }
  async signin(data : any) : Promise<any> {
    const res = await axios.post(`${environment.apiUrl}users/signin`, data)
    .then(res => res)
    .catch(err => err.response)
    return res;
  }


}
