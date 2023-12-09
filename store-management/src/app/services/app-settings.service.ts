import { ErrorHandler, Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { FormBuilder } from '@angular/forms';
import { EditAppSettingsData } from '../interfaces/form-inputs';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  constructor(
    private errorHandler : ErrorHandlerService,
    
  ) { }

  appSettings : any 
  

  async fetch(){
    try {
      const res = await axios.get(`${environment.apiUrl}app-settings`)
      this.appSettings = res.data
      return res.data
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }
  
  async update(data : EditAppSettingsData){
    try {
      const res = await axios.post(`${environment.apiUrl}app-settings`, data)
      this.appSettings = res.data
      return res.data
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }
}
