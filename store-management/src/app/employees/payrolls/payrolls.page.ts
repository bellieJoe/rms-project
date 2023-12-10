import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonMenu, IonModal, LoadingController, ToastController } from '@ionic/angular';
import { DateTime } from 'luxon';
import { GeneratePayrollData } from 'src/app/interfaces/form-inputs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { PayrollService } from 'src/app/services/payroll.service';

@Component({
  selector: 'app-payrolls',
  templateUrl: './payrolls.page.html',
  styleUrls: ['./payrolls.page.scss'],
})
export class PayrollsPage implements OnInit {

  constructor(
    private fb : FormBuilder,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private router : Router,
    private payrollService : PayrollService,
    private alertCtrl : AlertController
  ) { }

  payrolls : any = []
  selectedPayroll : any = {}
  @ViewChild('payroll_filter_menu') payrollFilterMenu! : IonMenu
  @ViewChild('view_payroll_details_modal') viewPayrollDetailsModal! : IonModal
  today = DateTime.now().toFormat('y-M-d')
  @ViewChild('generatePayrollModal') generatePayrollModal! : IonModal
  filter_payroll_form = this.fb.group({
    from: [DateTime.now().startOf('month').toFormat('y-MM-dd'), [Validators.required]],
    to: [DateTime.now().endOf('month').toFormat('y-MM-d'), [Validators.required]]
  })
  generate_payroll_form = this.fb.group({
    from: [null, [Validators.required]],
    to: [null, [Validators.required]]
  })
  
  public get from() {
    return this.generate_payroll_form.get('from')
  }
  public get to() {
    return this.generate_payroll_form.get('to')
  }

  ngOnInit() {
    // this.filter_payroll_form?.get('from')?.setValue(DateTime.now().startOf('month').toFormat('y-M-d'))
    // console.log(DateTime.now().startOf('month').toFormat('y-M-dd'))
    // console.log(DateTime.now().toFormat('y-MM-dd'))
  }

  async ionViewDidEnter(){
    const data : GeneratePayrollData = {
      from: this.filter_payroll_form?.get('from')?.value!,
      to: this.filter_payroll_form?.get('to')?.value!
    }
    const loader = await this.loadingCtrl.create({
      message: "Fetching Data",
      backdropDismiss: false,
      spinner: 'lines'
    })
    if(this.payrolls.length <= 0){
      await loader.present()
    }
    try {
      const res = await this.payrollService.getPayrolls(data)
      await loader.dismiss()
      this.payrolls = res.data
      console.log(this.payrolls)
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

  async doRefresh(e:any){
    await this.ionViewDidEnter()
    e.detail.complete()
  }

  async showGeneratePayroll(){
    await this.generatePayrollModal.present()
  }

  async generate_payroll_form__submit(){
    if(!await this.validate__generate_payroll_form()){
      
      return
    }
    const data : GeneratePayrollData = {
      from: this.from?.value!,
      to: this.to?.value!
    }
    const loader = await this.loadingCtrl.create({
      message: "Generating Payroll. This will take a moment.",
      backdropDismiss: false,
      spinner: 'lines'
    })
    const toast = await this.toastCtrl.create({
      message: "Payroll Generated Successfullty",
      icon: 'checkmark-cricle',
      duration: 1000
    })
    try {
      await loader.present()
      const res = await this.payrollService.generatePayroll(data)
      await this.generatePayrollModal.dismiss()
      await loader.dismiss()
      toast.present()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

  async validate__generate_payroll_form(){
    const from = DateTime.fromISO(this.from?.value!)
    const to = DateTime.fromISO(this.to?.value!)
    if(from > to){
      const alert = await this.alertCtrl.create({
        header: 'Invalid Data',
        message: 'Start Date must not be greater than the End Date',
        buttons: ['Ok']
      })
      alert.present()
      return false
    }
    return true
  }

  async viewFilterMenu(){
    await this.payrollFilterMenu.open()
  }

  async filter_payroll_form__submit(){
    const data : GeneratePayrollData = {
      from: this.filter_payroll_form?.get('from')?.value!,
      to: this.filter_payroll_form?.get('to')?.value!
    }
    const loader = await this.loadingCtrl.create({
      message: "Fetching Data",
      backdropDismiss: false,
      spinner: 'lines'
    })
    try {
      await loader.present()
      const res = await this.payrollService.getPayrolls(data)
      await loader.dismiss()
      this.payrolls = res.data
      await this.payrollFilterMenu.close()
      console.log(this.payrolls)
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

  async viewPayrollDetails(payroll : any){
    this.selectedPayroll = payroll
    console.log(this.selectedPayroll)
    await this.viewPayrollDetailsModal.present()
  }

}
