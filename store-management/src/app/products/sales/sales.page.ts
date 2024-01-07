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
  @ViewChild('month_selector') monthSelector! : IonDatetime
  @ViewChild('month_selector_button') monthSelectorButton! : IonDatetimeButton
  from : any = DateTime.now().startOf('month').toFormat('y-MM-dd')
  to : any = DateTime.now().endOf('month').toFormat('y-MM-dd')
  month : any 
  year : any
  orders : any = []
  monthlyTotal : number = 0;
  monthlyDeliveryTotal : number = 0
  _lineChartData : any = {
    dates: []
  }
  lineChartData : any  = {
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

  lineChartOptions : ChartConfiguration['options'] = {
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
  

  async ngOnInit() {
    const month = DateTime.now().toFormat('M')
    const year = DateTime.now().toFormat('y')
    this.month = month
    this.year = year
    await this.fetchMonthly(parseInt(month), parseInt(year))
  }

  async ionViewDidEnter(){
    
  }

  async datetime_changed(e:any){
    console.log(e.detail.value)
    const month = DateTime.fromISO(e.detail.value).toFormat('M')
    const year = DateTime.fromISO(e.detail.value).toFormat('y')
    this.month = month
    this.year = year
    await this.fetchMonthly(parseInt(month), parseInt(year))
  }

  async fetchMonthly(month:number, year:number){
    try {
      const res = await this.salesService.monthly(month, year)
      this.orders = res.data
      console.log(this.orders)
      this.computeTotalMonthlySales()
      this.initLineChart()
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async computeTotalMonthlySales(){
    this.monthlyTotal = 0
    this.monthlyDeliveryTotal = 0
    this.orders.forEach((order:any, i:any)=>{
      this.monthlyTotal += order.delivery_charge
      this.monthlyDeliveryTotal += order.delivery_charge
      order.orderItems.forEach((item:any)=>{
        this.monthlyTotal += (item.price * item.quantity)
      })
    })
  }

  async initLineChart(){
    this.lineChartData.datasets[0].data = []
    this.lineChartData.labels = []
    this.getAllDatesInMonth()
    interface DailyOrderSummary {
      date: string
      total_sales : number
    }
    let dailyOrderSummary : DailyOrderSummary[] = this._lineChartData.dates.map((dte:any)=>{
      return {
        date: dte,
        total_sales : 0
      }
    })
    console.log(dailyOrderSummary)
    this.orders.forEach((order:any)=>{
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
      this.lineChartData.datasets[0].data.push(data.total_sales)
      this.lineChartData.labels.push((i+1))
    })

    console.log(this.lineChartData)

    console.log(dailyOrderSummary)

    this.chart?.update()
  }

  async getAllDatesInMonth() {
    const firstDayOfMonth = DateTime.fromObject({ year: this.year, month: this.month, day: 1 });
    const lastDayOfMonth = firstDayOfMonth.endOf("month");
  
    this._lineChartData.dates = []
    let currentDate = firstDayOfMonth;
  
    while (currentDate <= lastDayOfMonth) {
      this._lineChartData.dates.push(currentDate.toISODate());
      currentDate = currentDate.plus({ days: 1 });
    }
    console.log(this._lineChartData.dates)
  
  }

}
