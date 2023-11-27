import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AddUserData } from '../interfaces/form-inputs'
import { AbstractControl, ValidationErrors } from '@angular/forms';

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
    private router : Router,
    private loadingCtrl : LoadingController
  ) { }

  isAuth() : boolean {
    const user = localStorage.getItem('user')
    return user ? true : false;
  }
  
  async signin(data : any) : Promise<any> {
    const loader = await this.loadingCtrl.create(
      {
        message: "Signing In",
        backdropDismiss: false,
        spinner: 'circular'
      }
    )
    try {
      await loader.present()
      const res = await axios.post(`${environment.apiUrl}users/signin-employee`, data)
      this.router.navigate(['/home'])
      console.log(res.data)
      await localStorage.setItem('user', JSON.stringify(res.data))
      await loader.dismiss()
    } catch (error) {
      console.log(error)
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

  getAuth(){
    const _auth : any = localStorage.getItem('user')
    const auth = JSON.parse(_auth)
    return auth
  }

  async logout () {
    const loader = await this.loadingCtrl.create({
      message: "Logging out",
      spinner: 'bubbles',
      backdropDismiss: false
    })
    await loader.present();
    localStorage.clear()

    await loader.dismiss();

    this.router.navigate(['/signin'])
  }

  async addUser(data : AddUserData){
    const res = await axios.post(`${environment.apiUrl}users/add-user`, data)
    return res;
  }

  async emailInUsed(email:string){
    const res = await axios.get(`${environment.apiUrl}users/email-inused/${email}`)
    return res;
  }

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

  async fetchUsers(page:number){
    const res = await axios.get(`${environment.apiUrl}users/?page=${page}`)
    return res;
  }

  async searchUserByName(keyword:number){
    const res = await axios.get(`${environment.apiUrl}users/search-by-name?keyword=${keyword}`)
    return res;
  }

  

}

