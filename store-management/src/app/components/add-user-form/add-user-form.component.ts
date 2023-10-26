import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AlertController, IonModal, LoadingController, ToastController } from '@ionic/angular';
import { AddUserData } from 'src/app/interfaces/form-inputs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
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
    private fb : FormBuilder,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private alertCtrl : AlertController,
    private errorHandler : ErrorHandlerService
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
      const res = await this.userService.addUser(data);
      console.log(res)
      await this.close()
      await loader.dismiss()
      await toast.present()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

  async close() {
    await this.addUserForm.reset()
    this.modal.dismiss()
  }
 

  ngOnInit() {
  }

}
