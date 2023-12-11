import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.page.html',
  styleUrls: ['./email-verification.page.scss'],
})
export class EmailVerificationPage implements OnInit {

  constructor(
    private fb : FormBuilder,
    private userService : UserService,
    private errorHandler : ErrorHandlerService,
    private laodingCtrl : LoadingController,
    private alertCtrl : AlertController
  ) { }

  verificationCode : string | null = null
  verify_email_form = this.fb.group({
    0 : [null, [Validators.required]],
    1 : [null, [Validators.required]],
    2 : [null, [Validators.required]],
    3 : [null, [Validators.required]],
    4 : [null, [Validators.required]],
    5 : [null, [Validators.required]]
  })

  ngOnInit() {
    console.log(this.verify_email_form)
  }

  async verify_email_form__submit(){
    const code = `${this.verify_email_form.get('0')?.value}${this.verify_email_form.get('1')?.value}${this.verify_email_form.get('2')?.value}${this.verify_email_form.get('3')?.value}${this.verify_email_form.get('4')?.value}${this.verify_email_form.get('5')?.value}`
    console.log(code)
    console.log(this.verificationCode)
    if(this.verificationCode != code){
      const alert = await this.alertCtrl.create({
        header: 'Verification Failed',
        message: 'The code you entered is invalid',
        buttons: ['Ok']
      })
      await alert.present()
      return 
    }
    await this.userService.verifyEmail(this.userService.auth.email)
  }

  async sendCode(){
    const loader = await this.laodingCtrl.create({
      message: 'Sending Verification Code',
      spinner: 'lines',
      backdropDismiss: false
    })
    try {
      await loader.present()
      const code =  Math.floor(100000 + Math.random() * 900000);
      await this.userService.sendVerificationEmail(this.userService.auth.email, code.toString())
      this.verificationCode = code.toString()
      await loader.dismiss()
      console.log(this.verificationCode)
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
    
  }

}
