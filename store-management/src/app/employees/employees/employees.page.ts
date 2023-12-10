import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';
import { EmployeeService } from 'src/app/services/employee.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {

  constructor(
    private fb : FormBuilder,
    private userService : UserService,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private employeeService : EmployeeService,
    private router : Router
  ) { }

  @ViewChild('view_employee_details_modal') viewEmployeeDetailsModal! : IonModal
  selectedEmployee : any = {}
  employees : any = []
  ngOnInit() {
  }

  async ionViewDidEnter(){
    const loader = await this.loadingCtrl.create({
      message: "Loading",
      spinner: 'lines',
      backdropDismiss: false
    })
    if(this.employees.length <= 0){
      await loader.present()
    }
    await this.fetchEmployees()
    await loader.dismiss()
  }

  async fetchEmployees(){
    try {
      const res = await this.employeeService.fetchEmployees()
      this.employees  = res!.data
      console.log(this.employees)
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async doRefresh(e:any){
    await this.ionViewDidEnter()
    e.detail.complete()
  }

  async employee_clicked(emp:any){
    this.selectedEmployee = emp
    await this.viewEmployeeDetailsModal.present()
  }

  async endEmployment(){
    const loader = await this.loadingCtrl.create({
      message: "Updating Employment",
      spinner: 'lines',
      backdropDismiss: false
    })
    const toast = await this.toastCtrl.create({
      message: "Employment Records was updated",
      icon: 'checkmark-circle',
      duration: 1000
    })
    try {
      await loader.present()
      await this.employeeService.endEmployment(this.selectedEmployee.id)
      await loader.dismiss()
      await toast.present()
      await this.viewEmployeeDetailsModal.dismiss()
      await this.ionViewDidEnter()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

  async viewDtr(){
    await this.viewEmployeeDetailsModal.dismiss()
    this.router.navigate(['/set-dtrs'], {
      state: {
        employee : this.selectedEmployee
      }
    })
  }

}
