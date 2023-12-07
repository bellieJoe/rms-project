import { Injectable } from '@angular/core';
import axios from 'axios';
import { ErrorHandlerService } from './error-handler.service';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private errorHandler : ErrorHandlerService
  ) { }

  async getCoordinates(address : string){
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURI(address)}&format=json`)
      console.log(await res.json())
      return await res.json()
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }
}
