import { Injectable } from '@angular/core';
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
import { environment } from 'src/environments/environment';
import { AddEmployeeData } from '../interfaces/form-inputs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private errorHandler : ErrorHandlerService
  ) { }

  async addEmployee(data:AddEmployeeData){
    const res = await axios.post(`${environment.apiUrl}employees`, data)
    return res
  }

  async fetchEmployees(){
      const res = await axios.get(`${environment.apiUrl}employees`)
      return res
  }

  async endEmployment(employee_id:any){
    const res = await axios.post(`${environment.apiUrl}employees/end-employment`, {
      employee_id: employee_id
    })
    return res
  }
}
