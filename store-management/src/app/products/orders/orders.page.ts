import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  constructor(
    private fb : FormBuilder
  ) { }

  ngOnInit() {
    this.setFilterChips()
  }
  
  ionViewDidEnter(){
    console.log(this.status!.value)
  }

  ordersFilterForm = this.fb.group({
    order_id : [''],
    status : ['Pending'],
    start_date : [''],
    end_date : ['']
  })

  filterChips : any = {
    status: null,
    order_id: null,
    start_date: null,
    end_date: null,
  }
  
  public get order_id() {
    return this.ordersFilterForm.get('order_id')
  }
  public get status() {
    return this.ordersFilterForm.get('status')
  }
  public get start_date() {
    return this.ordersFilterForm.get('start_date')
  }
  public get end_date() {
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
    ev.detail.complete()
  }
}
