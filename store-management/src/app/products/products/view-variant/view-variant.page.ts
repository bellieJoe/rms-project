import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-view-variant',
  templateUrl: './view-variant.page.html',
  styleUrls: ['./view-variant.page.scss'],
})
export class ViewVariantPage implements OnInit {

  constructor(
    private helperService : HelperService,
    private router : Router
  ) { }

  variant  : any

  async ionViewDidEnter(){
  }
  
  async ngOnInit() {
    const variant = this.helperService.getRouterNavState().variant
    this.variant = variant
    this.variant.image = await this.helperService.readImage(variant.image)
  }

  edit(){
    this.router.navigate(['/products/view-variant/edit'], {
      state: {
        variant : this.variant
      }
    })
  }

}
