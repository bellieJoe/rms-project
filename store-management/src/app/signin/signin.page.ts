import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  constructor() { }

  loginForm = new FormGroup({
    email:  new FormControl(''),
    password: new FormControl('')
  })

  ngOnInit() {
  }

  onSubmit(){

  }

}
