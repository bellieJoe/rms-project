import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, LoadingController, ToastController } from '@ionic/angular';
import { AddEmployeeData } from 'src/app/interfaces/form-inputs';
import { EmployeeService } from 'src/app/services/employee.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(
    private fb : FormBuilder,
    private userService : UserService,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private employeeService : EmployeeService,
    private router : Router
  ) { }

  employees : any = []
  users : any = []
  selectedUser : any = {}
  @ViewChild('user_selector_modal') userSelectorModal! : IonModal
  add_employee_form = this.fb.group({
    user_id: ['', [Validators.required]],
    position: ['', [Validators.required]],
    per_day_salary: ['', [Validators.required]]
  })
  
  public get user_id() {
    return this.add_employee_form.get('user_id')
  }
  public get position() {
    return this.add_employee_form.get('position')
  }
  public get per_day_salary() {
    return this.add_employee_form.get('per_day_salary')
  }
  
  ngOnInit() {
    
  }
  
  async selectUser(){
    await this.userSelectorModal.present()
  }

  async userSelected(i:any){
    this.user_id?.setValue(i.id)
    this.selectedUser = i
    console.log(this.selectedUser)
    this.userSelectorModal.dismiss()
  }

  async searchUser(e:any){
    try {
      const res = await this.userService.searchUserByName(e.detail.value)
      this.users = res.data
      console.log(this.users)
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async add_employee_form__submit(){
    const data : AddEmployeeData = {
      per_day_salary: parseFloat(this.per_day_salary?.value!),
      position: this.position?.value!,
      user_id: parseInt(this.user_id?.value!)
    }
    console.log(data)
    const loader = await this.loadingCtrl.create({
      message: 'Adding Employee',
      spinner: 'lines',
      backdropDismiss: false
    })
    const toast = await this.toastCtrl.create({
      message: 'Employee Added successfully',
      duration: 1000,
      icon: 'checkmark-circle'
    })
    try {
      await loader.present()
      const res = await this.employeeService.addEmployee(data)
      await loader.dismiss()
      this.router.navigate(['/employees'])
      await toast.present()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }

  }

}
