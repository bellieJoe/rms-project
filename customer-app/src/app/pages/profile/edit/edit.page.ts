import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { EditUserProfileData } from 'src/app/interfaces/form-inputs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(
    private userService : UserService,
    private fb : FormBuilder,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private router : Router
  ) { }

  user : any = {}
  editProfileForm = this.fb.group({
    user_id : [''],
    name : ['', [Validators.required, Validators.maxLength(100)]],
    contact_number : ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern(/^09/)]],
  })

  
  public get name() {
    return this.editProfileForm.get('name')
  }
  public get user_id() {
    return this.editProfileForm.get('user_id')
  }
  public get contact_number() {
    return this.editProfileForm.get('contact_number')
  }
  
  async ngOnInit() {
    this.user = await this.userService.getAuth()
    this.name?.setValue(this.user.userProfile.name)
    this.user_id?.setValue(this.user.id)
    this.contact_number?.setValue(this.user.userProfile.contact_number)
  }

  async submitEditProfileForm(){
    const loader = await this.loadingCtrl.create({
      message: 'Saving Profile',
      spinner: 'lines',
      backdropDismiss: false
    })
    const toast = await this.toastCtrl.create({
      message: 'Profile saved',
      icon: 'checkmark-circle',
      duration: 1000
    })
    try {
      await loader.present()
      const data : EditUserProfileData = {
        user_id : parseInt(this.user_id?.value!),
        name : this.name?.value!,
        contact_number : this.contact_number?.value!,
      }
      const res = await this.userService.editProfile(data)
      localStorage.setItem('user', JSON.stringify(res.data))
      await loader.dismiss()
      this.router.navigate(['/profile'])
      toast.present()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }


}
