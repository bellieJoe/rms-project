import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.page.html',
  styleUrls: ['./cancel.page.scss'],
})
export class CancelPage implements OnInit {

  constructor(
    private fb : FormBuilder,
    private helperService : HelperService,
    private errorHandler : ErrorHandlerService,
  ) { }

  order : any
  cancelOrderForm = this.fb.group({
    order_id : [null],
    reason : ['']
  })

  async ngOnInit() {
    this.order = this.helperService.getRouterNavState().order
  }

  async submitCancelOrderForm(){

  }

}
