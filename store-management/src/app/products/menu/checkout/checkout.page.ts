import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  constructor(
    private helperService : HelperService
  ) { }

  checkout : any

  async ngOnInit() {
    this.checkout = this.helperService.getRouterNavState().checkout
    console.log('====================================');
    console.log(this.checkout);
    console.log('====================================');
  }

}
