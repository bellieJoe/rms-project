import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private alertController : AlertController
  ) { }

  async handleError(error : any){
    const alert = await this.alertController.create({
      message: error.message,
      header: 'Unexpected Error',
      buttons: ['Ok']
    });
    console.log(error)
    if(error.response && error.response.message){
      alert.message = error.response.message
    }
    // if(error.response && error.response.data.message){
    //   alert.message = error.response.data.message
    // }
    if(error.response && error.response.data.error){
      alert.message = error.response.data.error
    }
    if(error.response && error.response.status == 422){
      alert.message = error.response.data.message
    }
    if(error.response && error.response.data){
      alert.message = error.response.data
    }
    
    await alert.present();
  }
}
