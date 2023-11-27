import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private userService : UserService,
    private router : Router
  ) { }

  user : any = {}
  async ngOnInit() {
    // this.user = await this.userService.getAuth()
  }

  async ionViewDidEnter() {
    this.user = await this.userService.getAuth()
  }

  async editProfile(){
    this.router.navigate(['/profile/edit'])
  }

}
