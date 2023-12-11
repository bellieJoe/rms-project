import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { GeneratePayrollData } from '../interfaces/form-inputs';
import { UserService } from './user.service';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  constructor(
    private userService : UserService
  ) { }

  async generatePayroll(data : GeneratePayrollData){
    const res = await axios.post(`${environment.apiUrl}payrolls/generate-payroll`, data)
    return res;
  }

  async getPayrolls(data : GeneratePayrollData){
    const employee_id = this.userService.auth.employee.id
    const res = this.userService.auth.employee.privilege_level == 1 
    ? await axios.get(`${environment.apiUrl}payrolls?from=${encodeURI(data.from)}&to=${encodeURI(data.to)}`)
    : await axios.get(`${environment.apiUrl}payrolls?from=${encodeURI(data.from)}&to=${encodeURI(data.to)}&employee_id=${employee_id}`)
    return res;
  }
}
