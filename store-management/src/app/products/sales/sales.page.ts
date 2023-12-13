import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {

  constructor() { }

  from : any = DateTime.now().startOf('month').toFormat('y-MM-dd')
  to : any = DateTime.now().endOf('month').toFormat('y-MM-dd')
  async ngOnInit() {
    console.log(this.from)
    console.log(this.to)
  }

  async datetime_changed(e:any){
    console.log(e)
  }



}
