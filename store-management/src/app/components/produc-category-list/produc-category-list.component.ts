import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produc-category-list',
  templateUrl: './produc-category-list.component.html',
  styleUrls: ['./produc-category-list.component.scss'],
})
export class ProducCategoryListComponent  implements OnInit {

  constructor(
    private router : Router
  ) { }

  @Input() categories : any;
  @Output() categoriesChange: EventEmitter<any> = new EventEmitter<any>();

  async categoryClick(category : any){
    this.router.navigate(['/product-category/view'], {
      state: {
        category: category
      }
    })
  }

  ngOnInit() {}

}
