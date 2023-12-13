import { Component, ErrorHandler, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    public userService : UserService,
    private errorHandler : ErrorHandler,
    private employeeService : EmployeeService
  ) { }

  dashboard : any = {}
  async ngOnInit() {
    try {
      const res = await this.employeeService.dashboard()
      this.dashboard = res.data
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

}
