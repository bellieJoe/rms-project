import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  constructor(
    private fb : FormBuilder,
    private errorHandler : ErrorHandlerService,
    private userService : UserService
  ) { }

  isPasswordVisible = false
  signinForm = this.fb.group({
    email: [''],
    password: ['']
  })

  ngOnInit() {
  }


  async submitSigninForm(){
    await this.userService.signin({
        email: this.signinForm.value.email, 
        password: this.signinForm.value.password
    })
  }

  async togglePassword(event:any){
    (console.log(event))
    this.isPasswordVisible = !this.isPasswordVisible
  }

}
