import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { ProductItemService } from 'src/app/services/product-item.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  constructor(
    private router : Router,
    private helperService : HelperService,
    private productItemService : ProductItemService
  ) { }

  product : any
  image : any

  async ngOnInit() {
    const navState = this.helperService.getRouterNavState()
    this.product = navState.product

    const res = await this.productItemService.imageReader(this.product.image)
    this.image = res.data
    console.log(this.image)
  }

  async updatePhoto(){
    this.router.navigate(['/products/change-image'], {
      state: {
        product : this.product
      }
    })
  }

}
