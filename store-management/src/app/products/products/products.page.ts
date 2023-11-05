import { Component, OnInit } from '@angular/core';
import { ProductItemService } from 'src/app/services/product-item.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(
    private productItemService : ProductItemService
  ) { }

  image! : string;

  async ngOnInit() {
    try {
      const res = await this.productItemService.imageReader()
      this.image = res.data
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

}
