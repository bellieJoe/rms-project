import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(
    private userService : UserService,
    private alertCtrl : AlertController,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private errorHandler : ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  email : string = ''

  async sendPasswordResetLink(){
    const loader  = await this.loadingCtrl.create({
      message: 'Sending Password Reset Link',
      backdropDismiss: false
    })
    const toast  = await this.toastCtrl.create({
      message: 'Password Reset link successfully sent. Please check yout email to complete resetting your password',
      duration: 1500
    })
    if(!this.email){
      const noemail = await this.alertCtrl.create({
        message: "Invalid Email",
        header: "Invalid Input",
      })
      await noemail.present()
      return 
    }
    try {
      await loader.present()
      await this.userService.sendPasswordResetLink(this.email)
      await loader.dismiss()
      await toast.present()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

}
