import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item-list',
  templateUrl: './product-item-list.component.html',
  styleUrls: ['./product-item-list.component.scss'],
})
export class ProductItemListComponent  implements OnInit {

  constructor(
    private router : Router
  ) { }

  @Input() products : any;
  @Output() productsChange: EventEmitter<any> = new EventEmitter<any>();

  async productClick(product : any){
    // this.router.navigate(['/users/view'], {
    //   state: {
    //     user: user
    //   }
    // })
  }


  ngOnInit() {}

}
