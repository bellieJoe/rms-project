import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, LoadingController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  
  constructor(
    private userService : UserService,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController
  ) { }

  users : any = []
  page : number = 1

  async fetchUsers(){
    if(this.page == 1){
      this.users = []
    }
    try {
      const _users = await this.userService.fetchUsers(this.page)
      this.users = [...this.users, ..._users.data]
      console.log(this.users)
      this.page++
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async refresh(event : any){
    this.page = 1
    this.users = []
    await this.fetchUsers()
    event.target.complete()
  }

  async onIonInfinite(event : any){
    await this.fetchUsers()
    event.target.complete()
  }

  async searchUserByName(event: any){
    if(!event.target.value){
      return
    }

    const loader = await this.loadingCtrl.create({
      message: 'Searching User',
      backdropDismiss: false,
      spinner: 'lines'
    })

    try {
      await loader.present()
      const _users = await this.userService.searchUserByName(event.target.value)
      this.users = _users.data
      this.page = 1
      await loader.dismiss()
    } catch (error) {
      await loader.dismiss()
      this.errorHandler.handleError(error)
    }
  }

  async ngOnInit() {
    const loader = await this.loadingCtrl.create({
      message: 'Loading',
      backdropDismiss: false,
      spinner: 'lines'
    })

    
    await loader.present()
    this.users = []
    this.page = 1
    await this.fetchUsers()
    await loader.dismiss()
  }

}
