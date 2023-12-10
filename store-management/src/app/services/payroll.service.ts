import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { GeneratePayrollData } from '../interfaces/form-inputs';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  constructor() { }

  async generatePayroll(data : GeneratePayrollData){
    const res = await axios.post(`${environment.apiUrl}payrolls/generate-payroll`, data)
    return res;
  }

  async getPayrolls(data : GeneratePayrollData){
    const res = await axios.get(`${environment.apiUrl}payrolls?from=${encodeURI(data.from)}&to=${encodeURI(data.to)}`)
    return res;
  }
}
