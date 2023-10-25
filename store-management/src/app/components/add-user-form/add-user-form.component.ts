import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { AddUserData } from 'src/app/interfaces/form-inputs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  
  constructor(
    private userService : UserService,
    private fb : FormBuilder
  ) { }

  addUserForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email],[this.userService.emailInUseValidator]],
    contactNumber: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })
  get name()  {
    return  this.addUserForm.get('name')
  }
  get email()  {
    return  this.addUserForm.get('email')
  }
  get contactNumber()  {
    return  this.addUserForm.get('contactNumber')
  }
  get password()  {
    return  this.addUserForm.get('password')
  }
  
  async submitAddUser(){
    const data : AddUserData = {
      name: this.addUserForm.value.name!,
      email: this.addUserForm.value.email!,
      password: this.addUserForm.value.password!,
      contactNumber: this.addUserForm.value.contactNumber!,
    }

    try {
      const res = await this.userService.addUser(data);
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  close() {
    this.modal.dismiss()
  }
 

  ngOnInit() {
  }

}
