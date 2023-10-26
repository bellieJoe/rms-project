import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent  implements OnInit {
  

  constructor() { }

  @Input() users : any;
  @Output() usersChange: EventEmitter<any> = new EventEmitter<any>();



  ngOnInit() {}

}
