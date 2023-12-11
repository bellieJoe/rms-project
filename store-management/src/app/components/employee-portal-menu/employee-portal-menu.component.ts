import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-portal-menu',
  templateUrl: './employee-portal-menu.component.html',
  styleUrls: ['./employee-portal-menu.component.scss'],
})
export class EmployeePortalMenuComponent  implements OnInit {

  constructor(
    private userService : UserService
  ) { }

  auth : any = this.userService.auth

  async ngOnInit() {
    
  }

}
