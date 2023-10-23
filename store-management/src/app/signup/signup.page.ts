import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor() { }

  signupForm = new FormGroup({
    email:  new FormControl(''),
    password: new FormControl('')
  })

  onSubmit(){
    
  }

  ngOnInit() {
  }

}
