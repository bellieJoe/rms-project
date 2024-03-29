import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { AddUserData, EditUserProfileData } from '../interfaces/form-inputs';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './error-handler.service';

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
    private loadingCtrl : LoadingController,
    private router : Router,
    private errorHandler : ErrorHandlerService
  ) { }

  public get auth() : any {
    const _auth : any = localStorage.getItem('user')
    const auth = JSON.parse(_auth)
    return auth
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

  async signup(data : AddUserData){
    const res = await axios.post(`${environment.apiUrl}users/signup`, data)
    return res;
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

    this.router.navigate(['/home'])
  }

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
      const res = await axios.post(`${environment.apiUrl}users/signin`, data)
      this.router.navigate(['/menu'])
      console.log(res.data)
      await localStorage.setItem('user', JSON.stringify(res.data))
      await loader.dismiss()
    } catch (error) {
      console.log(error)
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

  async getAuth(){
    const _auth : any = await localStorage.getItem('user')
    const auth = JSON.parse(_auth)
    return auth
  }

  async editProfile(data:EditUserProfileData){
    // edit-profile
    const res = await axios.put(`${environment.apiUrl}users/edit-profile`, data)
    return res
  }

  async sendVerificationEmail(email:string, code:string){
    // 
    const res = await axios.post(`${environment.apiUrl}users/send-verification-email`, {
      email: email,
      code : code
    })
    return res
  }
  
  async verifyEmail(email:string){
    // 
    const loader = await this.loadingCtrl.create({
      message: 'Verifying Account',
      spinner: 'lines',
      backdropDismiss: false
    })
    try {
      await loader.present()
      const res = await axios.post(`${environment.apiUrl}users/verify-email`, {
        email: email
      })
      localStorage.setItem('user', JSON.stringify(res.data))
      this.router.navigate(['/home'])
      await loader.dismiss()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
    
  }

  async sendPasswordResetLink(email:string){
    const res = await axios.post(`${environment.apiUrl}users/send-password-reset-link`, {
      email: email
    })
  }

  async validatePasswordResetLink(email:any, password:any){
    const res = await axios.post(`${environment.apiUrl}users/validate-password-reset-link`, {
      email: email,
      password: password
    })
    return res
  }

  async updatePassword(email:any, password:any){
    const res = await axios.post(`${environment.apiUrl}users/update-password`, {
      email: email,
      password: password
    })
    return res
  }
}
