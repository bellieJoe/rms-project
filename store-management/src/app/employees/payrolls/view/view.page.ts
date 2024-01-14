import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { PayrollsPage } from '../payrolls.page';
import { PayrollService } from 'src/app/services/payroll.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  constructor(
    private helperService : HelperService,
    private router : Router,
    private payrollService : PayrollService,
    private alertCtrl : AlertController,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController
  ) { }

  public payroll_range : any = {}
  public payrolls : any = []

  ngOnInit() {
    this.payroll_range = this.helperService.getRouterNavState().payroll_range;
    console.log(this.payroll_range)
  }

  async ionViewDidEnter(){
    await this.fetchPayrolls()
  }

  async fetchPayrolls(){
    this.payrolls = await (await this.payrollService.getPayrollsByPayrollRange(this.payroll_range.id)).data
    console.log(this.payrolls)
  }

  async deletePayroll(){
    const alert = await this.alertCtrl.create({
      message: "Are you sure you want to delete this payroll?",
      buttons: [
        {
          text : 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete Payroll',
          role: 'destructive',
          handler: async ()=> {
            const loader = await this.loadingCtrl.create({
              message: 'Deleting Payroll'
            })
            try {
              await loader.present()
              await this.payrollService.deletePayrollRanage(this.payroll_range.id)
              const toast = await this.toastCtrl.create({
                message: 'Payroll successfully deleted',
                duration: 1000
              })
              await toast.present()
              await loader.dismiss()
              this.router.navigate(['/payrolls'])
            } catch (error) {
              await loader.dismiss()
              this.errorHandler.handleError(error)
            }
            
          },
        }
        
      ]
    })
    await alert.present()
  }

}
