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

  async getPayrolls(year:number){
    const employee_id = this.userService.auth.employee.id
    const res = this.userService.auth.employee.privilege_level == 1 
    ? await axios.get(`${environment.apiUrl}payrolls?year=${year}`)
    : await axios.get(`${environment.apiUrl}payrolls?year=${year}`)
    return res;
  }

  async getPayrollsByPayrollRange(payroll_range_id:number){
    const res = await axios.get(`${environment.apiUrl}payrolls/get-list?payroll_range_id=${payroll_range_id}`)
    return res;
  }

  async deletePayrollRanage(payroll_range_id:number){
    const res = await axios.delete(`${environment.apiUrl}payrolls/delete-payroll-range?payroll_range_id=${payroll_range_id}`)
    return res;
  }
}
