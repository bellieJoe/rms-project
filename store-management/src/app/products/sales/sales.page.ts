import { Component, ErrorHandler, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, IonDatetimeButton } from '@ionic/angular';
import { DateTime } from 'luxon';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {

  constructor(
    private salesService : SalesService,
    private errorHandler : ErrorHandler
  ) { }

  @ViewChild('month_selector') monthSelector! : IonDatetime
  @ViewChild('month_selector_button') monthSelectorButton! : IonDatetimeButton
  from : any = DateTime.now().startOf('month').toFormat('y-MM-dd')
  to : any = DateTime.now().endOf('month').toFormat('y-MM-dd')
  orders : any = []

  async ngOnInit() {
    const month = DateTime.now().toFormat('M')
    const year = DateTime.now().toFormat('y')
    await this.fetchMonthly(parseInt(month), parseInt(year))
  }

  async ionViewDidEnter(){
    
  }

  async datetime_changed(e:any){
    console.log(e.detail.value)
    const month = DateTime.fromISO(e.detail.value).toFormat('M')
    const year = DateTime.fromISO(e.detail.value).toFormat('y')
    console.log('change')
    await this.fetchMonthly(parseInt(month), parseInt(year))
  }

  async fetchMonthly(month:number, year:number){
    try {
      const res = await this.salesService.monthly(month, year)
      this.orders = res.data
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }



}
