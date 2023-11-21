import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { AddUserData } from '../interfaces/form-inputs';

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

  emailInUseValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    const email = control.value;
    return new Promise((resolve) => {
      axios.get(`${environment.apiUrl}users/email-inused/${email}`)
      .then((res)=>{
        if(res){
          resolve({ emailInUse: true });
        }
        else{
          resolve(null);
        }
      })
      .catch((err)=>{
        resolve(null);
      })
    });
  }

  async signup(data : AddUserData){
    const res = await axios.post(`${environment.apiUrl}users/signup`, data)
    return res;
  }
}
