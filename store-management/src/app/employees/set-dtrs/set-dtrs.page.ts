import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';
import { DateTime } from 'luxon';
import { AddDtrData } from 'src/app/interfaces/form-inputs';
import { DtrService } from 'src/app/services/dtr.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-set-dtrs',
  templateUrl: './set-dtrs.page.html',
  styleUrls: ['./set-dtrs.page.scss'],
})
export class SetDtrsPage implements OnInit {

  constructor(
    private dtrService : DtrService,
    private fb : FormBuilder,
    private helperService : HelperService,
    private userService : UserService,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private employeeService : EmployeeService,
    private router : Router
  ) { }

  @ViewChild('update_dtr_modal') updateDtrModal! : IonModal
  selectedDate : any = null
  employee : any = {}
  dtr  : any = null

  // timevalidation : ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //   const _in = control.get('in')
  //   const _out = control.get('out')
  //   return password?.value != password_confirmation?.value ? {inValidTimes : true} : null;
  // }

  add_update_dtr_form = this.fb.group({
    employee_id : [null, Validators.required],
    in : [null, Validators.required],
    out : [null, Validators.required],
    date : [null, Validators.required]
  })
  public get employee_id()  {
    return this.add_update_dtr_form.get('employee_id')
  }
  public get in()  {
    return this.add_update_dtr_form.get('in')
  }
  public get out()  {
    return this.add_update_dtr_form.get('out')
  }
  public get date()  {
    return this.add_update_dtr_form.get('date')
  }
  

  async ngOnInit() {
    this.employee = this.helperService.getRouterNavState().employee
  }

  async dateChanged(e:any){
    const date = DateTime.fromISO(e.detail.value)
    this.selectedDate = date
    try {
      const res = await this.dtrService.getByDate(date.toFormat('y-M-d'), this.employee.id)
      this.dtr = res.data
    } catch (error) {
      this.errorHandler.handleError(error)
    }
    console.log(date)
  }

  async showUpdateDtr(){
    this.employee_id?.setValue(this.employee.id)
    this.date?.setValue(this.selectedDate.toFormat('y-M-d'))
    this.in?.setValue(this.dtr?.in)
    this.out?.setValue(this.dtr?.out)
    await this.updateDtrModal.present()
  }

  async add_update_dtr_form__submit(){
    const data : AddDtrData = {
      in: this.in?.value,
      out: this.out?.value,
      date: this.date?.value,
      employee_id: this.employee_id?.value!
    }
    const loader = await this.loadingCtrl.create({
      message: "Updating DTR",
      backdropDismiss: false
    })
    const toast = await this.toastCtrl.create({
      message: "DTR updated successfully",
      duration: 1000,
      icon: 'checkmark-circle'
    })
    try {
      await loader.present()
      const res = await this.dtrService.addOrUpdate(data)
      this.dtr = res.data
      await loader.dismiss()
      await this.updateDtrModal.dismiss()
      toast.present()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }
}
