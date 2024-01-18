import { Component, ErrorHandler, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, IonDatetimeButton } from '@ionic/angular';
import { Chart, ChartConfiguration } from 'chart.js';
import { DateTime } from 'luxon';
import { SalesService } from 'src/app/services/sales.service';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {

  constructor(
    private salesService : SalesService,
    private errorHandler : ErrorHandler
  ) { 
    Chart.register(Annotation);
  }

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('month_selector') monthlyDateSelector! : IonDatetime
  @ViewChild('month_selector_button') monthlyDateSelectorButton! : IonDatetimeButton
  @ViewChild('daily_selector') dailyDateSelector! : IonDatetime
  @ViewChild('daily_selector_button') dailyDateSelectorButton! : IonDatetimeButton
  public dateCategory : string = 'monthly';
  from : any = DateTime.now().startOf('month').toFormat('y-MM-dd')
  to : any = DateTime.now().endOf('month').toFormat('y-MM-dd')
  month : any 
  year : any
  day : any = DateTime.now().toFormat('d')
  ordersMonthly : any = []
  ordersDaily : any = []
  ordersYearly : any = []
  monthlyTotal : number = 0;
  monthlyDeliveryTotal : number = 0;
  yearlyTotal : number = 0;
  yearlyDeliveryTotal : number = 0;
  dailyTotal : number = 0;
  dailyDeliveryTotal : number = 0;
  private _monthlyLineChartData : any = {
    dates: []
  }
  public monthlyLineChartData : any  = {
    datasets: [
      {
        data: [],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [],
  };
  public monthlyLineChartOptions : ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
        title: {
          display: true,
          text: 'Amount (in Pesos)'
        }
      },
      x: {
        position: 'bottom',
        title: {
          display: true,
          text: 'Days in Month'
        }
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'orange',
              // content: 'LineAnno',
              font: {
                weight: 'bold',
              },
            },
          },
        ],
      },
    },
  };
  public dailyLineChartData : any  = {
    datasets: [
      {
        data: [],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [],
  };
  public dailyLineChartOptions : ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
        title: {
          display: true,
          text: 'Amount (in Pesos)'
        }
      },
      x: {
        position: 'bottom',
        title: {
          display: true,
          text: 'Hours'
        }
      },
    },

    plugins: {
      legend: { display: true },
      annotation: {
      },
    },
  };
  public yearlyLineChartData : any  = {
    datasets: [
      {
        data: [],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [],
  };
  public yearlyLineChartOptions : ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
        title: {
          display: true,
          text: 'Amount (in Pesos)'
        }
      },
      x: {
        position: 'bottom',
        title: {
          display: true,
          text: 'Hours'
        }
      },
    },

    plugins: {
      legend: { display: true },
      annotation: {
      },
    },
  };

  async ngOnInit() {
    const month = DateTime.now().toFormat('M')
    const year = DateTime.now().toFormat('y')
    this.month = month
    this.year = year
    await this.fetchMonthly(parseInt(month), parseInt(year))
  }

  async ionViewDidEnter(){
    
  }

  public async daily_datetime_changed(e:any){
    console.log(e.detail.value)
    const month = DateTime.fromISO(e.detail.value).toFormat('M')
    const year = DateTime.fromISO(e.detail.value).toFormat('y')
    const day = DateTime.fromISO(e.detail.value).toFormat('d')
    this.month = month
    this.year = year
    this.day = day
    await this.fetchDaily(parseInt(month), parseInt(year), parseInt(day))
  }

  public async yearly_datetime_changed(e:any){
    console.log(e.detail.value)
    const year = DateTime.fromISO(e.detail.value).toFormat('y')
    this.year = year
    await this.fetchYearly(parseInt(year))
  }

  public async monthly_datetime_changed(e:any){
    console.log(e.detail.value)
    const month = DateTime.fromISO(e.detail.value).toFormat('M')
    const year = DateTime.fromISO(e.detail.value).toFormat('y')
    this.month = month
    this.year = year
    await this.fetchMonthly(parseInt(month), parseInt(year))
  }

  private async fetchMonthly(month:number, year:number){
    try {
      const res = await this.salesService.monthly(month, year)
      this.ordersMonthly = res.data
      console.log(this.ordersMonthly)
      this.computeTotalMonthlySales()
      this.initMonthlyLineChart()
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  private async fetchDaily(month:number, year:number, day:number){
    try {
      const res = await this.salesService.daily(month, year, day)
      this.ordersDaily = res.data
      console.log(this.ordersDaily)
      this.computeTotalDailySales()
      this.initDailyLineChart()
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  private async fetchYearly(year:number){
    try {
      const res = await this.salesService.yearly(year)
      this.ordersYearly = res.data
      console.log(this.ordersYearly)
      this.computeTotalYearlySales()
      this.initYearlyLineChart()
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  private async computeTotalMonthlySales(){
    this.monthlyTotal = 0
    this.monthlyDeliveryTotal = 0
    this.ordersMonthly.forEach((order:any, i:any)=>{
      this.monthlyTotal += order.delivery_charge
      this.monthlyDeliveryTotal += order.delivery_charge
      order.orderItems.forEach((item:any)=>{
        this.monthlyTotal += (item.price * item.quantity)
      })
    })
  }

  private async computeTotalDailySales(){
    this.dailyTotal = 0
    this.dailyDeliveryTotal = 0
    this.ordersDaily.forEach((order:any, i:any)=>{
      this.dailyTotal += order.delivery_charge
      this.dailyDeliveryTotal += order.delivery_charge
      order.orderItems.forEach((item:any)=>{
        this.dailyTotal += (item.price * item.quantity)
      })
    })
  }

  private async computeTotalYearlySales(){
    this.yearlyTotal = 0
    this.yearlyDeliveryTotal = 0
    this.ordersYearly.forEach((order:any, i:any)=>{
      this.yearlyTotal += order.delivery_charge
      this.yearlyDeliveryTotal += order.delivery_charge
      order.orderItems.forEach((item:any)=>{
        this.yearlyTotal += (item.price * item.quantity)
      })
    })
  }

  private async initMonthlyLineChart(){
    this.monthlyLineChartData.datasets[0].data = []
    this.monthlyLineChartData.labels = []
    this.getAllDatesInMonth()
    interface DailyOrderSummary {
      date: string
      total_sales : number
    }
    let dailyOrderSummary : DailyOrderSummary[] = this._monthlyLineChartData.dates.map((dte:any)=>{
      return {
        date: dte,
        total_sales : 0
      }
    })
    this.ordersMonthly.forEach((order:any)=>{
      // console.log(order.date_ordered.substring(0,10))
      dailyOrderSummary.forEach((summ:any, i:number)=>{
        if(summ.date == order.date_ordered.substring(0,10)){
          dailyOrderSummary[i].total_sales += order.delivery_charge
          order.orderItems.forEach((item:any)=>{
            dailyOrderSummary[i].total_sales += (item.price * item.quantity)
          })
        }
      })
      return order.date_ordered
    })
    dailyOrderSummary.forEach((data:DailyOrderSummary, i:any)=>{
      this.monthlyLineChartData.datasets[0].data.push(data.total_sales)
      this.monthlyLineChartData.labels.push((i+1))
    })

    this.chart?.update()
  }

  private async initDailyLineChart(){
    this.dailyLineChartData.datasets[0].data = []
    this.dailyLineChartData.labels = []
    for (let i = 0; i < 24; i++) {
      console.log(i)
      let total = 0
      const dateTime = DateTime.fromObject({
        hour: i,
        minute: 0
      })
      this.ordersDaily.forEach((order:any)=>{
        let date_ordered = DateTime.fromISO(order.date_ordered)
        if(date_ordered.hour == i){
          total+=order.total
        }
      })
      this.dailyLineChartData.datasets[0].data.push(total)
      this.dailyLineChartData.labels.push(dateTime.toFormat('h:mm a'))
      console.log(dateTime.toFormat('h:mm a'))
    }

    this.chart?.update()
  }

  private async initYearlyLineChart(){
    this.yearlyLineChartData.datasets[0].data = []
    this.yearlyLineChartData.labels = []
    for (let i = 1; i < 13; i++) {
      console.log(i)
      let total = 0
      const dateTime = DateTime.fromObject({
        hour: i,
        minute: 0,
        year: this.year,
        month: i
      })
      this.ordersYearly.forEach((order:any)=>{
        let date_ordered = DateTime.fromISO(order.date_ordered)
        if(date_ordered.month == i){
          total+=order.total
        }
      })
      this.yearlyLineChartData.datasets[0].data.push(total)
      this.yearlyLineChartData.labels.push(dateTime.toFormat('LLL'))
      console.log(dateTime.toFormat('LLL'))
    }

    this.chart?.update()
  }

  private async getAllDatesInMonth() {
    const firstDayOfMonth = DateTime.fromObject({ year: this.year, month: this.month, day: 1 });
    const lastDayOfMonth = firstDayOfMonth.endOf("month");
  
    this._monthlyLineChartData.dates = []
    let currentDate = firstDayOfMonth;
  
    while (currentDate <= lastDayOfMonth) {
      this._monthlyLineChartData.dates.push(currentDate.toISODate());
      currentDate = currentDate.plus({ days: 1 });
    }
    console.log(this._monthlyLineChartData.dates)
  
  }

  // private async getAllHoursInDay() {
  //   const firstDayOfMonth = DateTime.fromObject({ year: this.year, month: this.month, day: 1 });
  //   const lastDayOfMonth = firstDayOfMonth.endOf("month");
  
  //   this._monthlyLineChartData.dates = []
  //   let currentDate = firstDayOfMonth;
  
  //   while (currentDate <= lastDayOfMonth) {
  //     this._monthlyLineChartData.dates.push(currentDate.toISODate());
  //     currentDate = currentDate.plus({ days: 1 });
  //   }
  //   console.log(this._monthlyLineChartData.dates)
  
  // }

  public async dateCategorySelect(event:any){
    this.dateCategory = event.detail.value
    if(this.dateCategory == 'monthly'){
      this.fetchMonthly(this.month, this.year)
      return 
    }
    if(this.dateCategory == 'daily'){
      this.fetchDaily(this.month, this.year, this.day)
      return 
    }
    if(this.dateCategory == 'yearly'){
      this.fetchYearly(this.year)
      return 
    }
  }

}
