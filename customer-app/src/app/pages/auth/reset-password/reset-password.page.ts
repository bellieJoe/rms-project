import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(
    private fb : FormBuilder,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private userService : UserService,
    private errorHandler : ErrorHandlerService,
    private alertCtrl : AlertController,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController
  ) { }

  public email : any = ''
  private password_hash : any = ''
  public isPasswordVisible  = false
  private passwordValidation : ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')
    const password_confirmation = control.get('password_confirmation')
    return password?.value != password_confirmation?.value ? {passwordMismatch : true} : null;
  }

  public resetPasswordForm = this.fb.group({
    password : ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation : ['', [Validators.required, Validators.minLength(8)]]
  })

  public get password() {
    return this.resetPasswordForm.get('password')
  }
  
  public get password_confirmation() {
    return this.resetPasswordForm.get('password_confirmation')
  }

  async ngOnInit() {
    this.resetPasswordForm.addValidators(this.passwordValidation)
    this.email = this.activatedRoute.snapshot.queryParams['email']
    this.password_hash = this.activatedRoute.snapshot.queryParams['password']
    // console.log(this.activatedRoute.snapshot.queryParams.)
    console.log(this.password_hash)
    await this.validateLink()
  }

  async validateLink(){
    try {
      const res = await this.userService.validatePasswordResetLink(this.email, this.password_hash)
      console.log(res)
      console.log("Valid Link")
    } catch (error) {
      await this.errorHandler.handleError(error)
      this.router.navigate(['/'])
    }
  }

  async togglePassword(event:any){
    (console.log(event))
    this.isPasswordVisible = !this.isPasswordVisible
  }

  async resetPasswordForm_submit(){
    const toast  = await this.toastCtrl.create({
      message: 'Password successfully reset',
      duration : 1000
    })
    const loader = await this.loadingCtrl.create({
      message: 'Reseting Password',
      backdropDismiss: false
    })
    try {
      await loader.present()
      await this.userService.updatePassword(this.email, this.password?.value)
      await loader.dismiss()
      await toast.present()
      this.router.navigate(['/'])
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

}
