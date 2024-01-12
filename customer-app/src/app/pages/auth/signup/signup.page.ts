import { Component, ErrorHandler, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { AddUserData } from 'src/app/interfaces/form-inputs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    private fb : FormBuilder,
    private userService : UserService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private errorHandler : ErrorHandlerService,
    private router : Router
  ) { }

  isPasswordVisible  = false
  passwordValidation : ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')
    const password_confirmation = control.get('password_confirmation')
    return password?.value != password_confirmation?.value ? {passwordMismatch : true} : null;
  }

  signupForm  = this.fb.group({
    name : ['', [Validators.required, Validators.maxLength(100)]],
    email : ['', [Validators.required, Validators.email],[this.userService.emailInUseValidator]],
    contact_number : ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
    password : ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation : ['', [Validators.required, Validators.minLength(8)]]
  })

  
  public get name() {
    return this.signupForm.get('name')
  }
  
  public get email() {
    return this.signupForm.get('email')
  }
  
  public get contact_number() {
    return this.signupForm.get('contact_number')
  }
  
  public get password() {
    return this.signupForm.get('password')
  }
  
  public get password_confirmation() {
    return this.signupForm.get('password_confirmation')
  }
  
  ngOnInit() {
    this.signupForm.addValidators(this.passwordValidation)
  }

  async submitSignupForm(){
    const data : AddUserData = {
      name: this.signupForm.value.name!,
      email: this.signupForm.value.email!,
      password: this.signupForm.value.password!,
      contactNumber: this.signupForm.value.contact_number!,
    }

    const loader = await this.loadingCtrl.create({
      message: "Creating new User",
      spinner: 'lines',
      backdropDismiss: false
    })
    const toast = await this.toastCtrl.create({
      message: "User created successfully",
      icon: 'checkmark-circle',
      duration: 1000
    })

    try {
      await loader.present()
      const res = await this.userService.signup(data);
      console.log(res)
      await loader.dismiss()
      this.router.navigate(['/'])
      await toast.present()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

  async togglePassword(event:any){
    (console.log(event))
    this.isPasswordVisible = !this.isPasswordVisible
  }

  

}
