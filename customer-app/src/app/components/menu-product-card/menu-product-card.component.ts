import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-product-card',
  templateUrl: './menu-product-card.component.html',
  styleUrls: ['./menu-product-card.component.scss'],
})
export class MenuProductCardComponent  implements OnInit {

  constructor() { }

  @Input() item : any;
  @Output() onAddCart = new EventEmitter<any>()

  async addToCart(){
    this.onAddCart.emit(this.item)
  }

  ngOnInit() {
    // console.log(this.item)
  }

}
