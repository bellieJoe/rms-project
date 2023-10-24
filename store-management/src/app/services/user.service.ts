import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { Router, RouterLink } from '@angular/router';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private errorHandler : ErrorHandlerService,
    private router : Router
  ) { }

  // async login(data : any) : Promise<any> {
  //   const res = await axios.post(`${environment.apiUrl}/users/signin`, data)
  //   .then(res => res)
  //   .catch(err => err.response)
  //   return res;
  // }
  isAuth() : boolean {
    const user = localStorage.getItem('user')
    return user ? true : false;
  }
  
  async signin(data : any) : Promise<any> {
    try {
      const res = await axios.post(`${environment.apiUrl}users/signin`, data)
      this.router.navigate(['/home'])
      console.log(res.data)
      await localStorage.setItem('user', JSON.stringify(res.data))
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async getAuth(){
    const _auth : any = await localStorage.getItem('user')
    const auth = JSON.parse(_auth)
    return auth
  }

}

