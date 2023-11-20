import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { FetchOrdersData } from 'src/app/interfaces/form-inputs';
import { HelperService } from 'src/app/services/helper.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  constructor(
    private fb : FormBuilder,
    private ordersService : OrdersService,
    private helperService : HelperService,
    private loadingCtrl : LoadingController
  ) { }

  page : number = 1
  orders : any = []
  ordersFilterForm = this.fb.group({
    order_id : [''],
    status : ['Processing'],
    start_date : [''],
    end_date : ['']
  })

  filterChips : any = {
    status: null,
    order_id: null,
    start_date: null,
    end_date: null,
  }

  async ngOnInit() {
    const loader = await this.loadingCtrl.create({
      message: "Preparing Orders",
      spinner: 'lines',
      backdropDismiss: false
    })
    await loader.present()
    this.page = 1
    this.setFilterChips()
    this.orders = await this.fetchOrders()
    await loader.dismiss()
  }
  
  ionViewDidEnter(){
    console.log(this.status!.value)
  }

  async fetchOrders(){
    const data : FetchOrdersData = {
      order_id : this.order_id!.value,
      status: this.status!.value,
      start_date: this.start_date!.value,
      end_date: this.end_date!.value,
      page: this.page
    }
    try {
      const res = await this.ordersService.fetchOrders(data)
      return res.data
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  
  public get order_id() : any {
    return this.ordersFilterForm.get('order_id')
  }
  public get status() : any {
    return this.ordersFilterForm.get('status')
  }
  public get start_date() : any {
    return this.ordersFilterForm.get('start_date')
  }
  public get end_date() : any {
    return this.ordersFilterForm.get('end_date')
  }

  async ordersFilterFormSubmit(){
    console.log(this.ordersFilterForm.value.status)
    console.log(this.start_date!.value)
    console.log(this.end_date!.value)
    console.log(this.order_id!.value)
  }

  setFilterChips(){
    this.filterChips.status = this.status!.value
    this.filterChips.start_date = this.start_date!.value
    this.filterChips.end_date = this.end_date!.value
    this.filterChips.order_id = this.order_id!.value
  }

  async refresh(ev : any){
    await this.ngOnInit()
    ev.detail.complete()
  }
}
