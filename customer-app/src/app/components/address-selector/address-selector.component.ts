import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-address-selector',
  templateUrl: './address-selector.component.html',
  styleUrls: ['./address-selector.component.scss'],
})
export class AddressSelectorComponent  implements OnInit {

  constructor(
    private mapService : MapService
  ) { }

  addresses : any = []
  @Output() onAddressSelect = new EventEmitter<any>()

  ngOnInit() {}

  async searchChange(ev:any){
    this.addresses = await this.mapService.getAddressSuggestion(ev.detail.value)
  }

  async selectAddress(address:string){
    this.onAddressSelect.emit(address)
  }

}
