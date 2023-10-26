import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
  ) { }

  navState : any;
  category : any;

  ngOnInit() {
    if(!this.router.getCurrentNavigation()?.extras.state ){
      location.href = "/";
    }
    this.navState = this.router.getCurrentNavigation()?.extras.state;
    this.category = this.navState.category
  }

}
