import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AddUserData } from '../interfaces/form-inputs'
import { AbstractControl, ValidationErrors } from '@angular/forms';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private errorHandler : ErrorHandlerService
  ) { }

  async initializeMenu(){
    try {
      const res = await axios.get(`${environment.apiUrl}menu/init`)
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error)
      this.errorHandler.handleError(error)
    }
  }
}
