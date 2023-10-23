import { sanitizeIdentifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  providers: [
    UserService
  ]
})
export class SigninPage implements OnInit {

  constructor(
    private userService : UserService
  ) { }

  loginForm = new FormGroup({
    email:  new FormControl(''),
    password: new FormControl('')
  })

  async ngOnInit() {
  }

  async submitLoginForm(){
    await this.userService.signin({
        email: this.loginForm.value.email, 
        password: this.loginForm.value.password
    })
  }

}
