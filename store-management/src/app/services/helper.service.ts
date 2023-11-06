import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private router : Router
  ) { }


  getRouterNavState() : any{
    if(!this.router.getCurrentNavigation()?.extras.state ){
      location.href = "/";
    }
    return this.router.getCurrentNavigation()?.extras.state;
  }
}
