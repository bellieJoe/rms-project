import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent  implements OnInit {
  

  constructor(
    private router : Router
  ) { }

  @Input() users : any;
  @Output() usersChange: EventEmitter<any> = new EventEmitter<any>();

  async userClick(user : any){
    this.router.navigate(['/users/view'], {
      state: {
        user: user
      }
    })
  }



  ngOnInit() {}

}
