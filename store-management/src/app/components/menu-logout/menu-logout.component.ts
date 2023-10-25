import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-logout',
  templateUrl: './menu-logout.component.html',
  styleUrls: ['./menu-logout.component.scss'],
})
export class MenuLogoutComponent  implements OnInit {

  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {}

  logout(){
    this.userService.logout()
  }

}
