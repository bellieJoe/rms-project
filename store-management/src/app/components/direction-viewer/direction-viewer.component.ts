import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { circle, Icon, icon, LatLng, latLng, LatLngBoundsExpression, LatLngExpression, Map, MapOptions, Marker, marker, Point, Polygon, polyline, tileLayer } from 'leaflet';
import { Coordinates } from 'src/app/interfaces/form-inputs';
import { AppSettingsService } from 'src/app/services/app-settings.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-direction-viewer',
  templateUrl: './direction-viewer.component.html',
  styleUrls: ['./direction-viewer.component.scss'],
})
export class DirectionViewerComponent  implements OnInit {


  constructor(
    private mapService : MapService,
    private appSettingsService : AppSettingsService
  ) {
    
   }


  

  isDisplayed : boolean = false
  @Input() end : any
  @Input() start : any
  @Output() onMapSelect = new EventEmitter<any>
  map!: Map
  mapOptions: MapOptions = {
    layers: [
      // tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 18,
    center: latLng(13.4449707, 121.8299243) // Default center coordinates
  }
  tappedCoordinates: { lat: number, lng: number } = {lat: 0, lng: 0}
  directionPL = polyline([])

  async ngOnInit() {
    console.log(parseFloat(this.start.lat))
    console.log(parseFloat(this.start.long))
    setTimeout(() => {
      this.isDisplayed = true
    }, 900);
    await this.appSettingsService.fetch()
  }

  
  async onMapReady(map: Map) {
    
    this.map = map;
    this.map.on('click', this.onMapClick.bind(this));
    await this.initDirections()
    this.map.flyTo(latLng(parseFloat(this.start.lat), parseFloat(this.start.long)))
    circle(latLng(parseFloat(this.appSettingsService.appSettings.json_store_location.lat),parseFloat(this.appSettingsService.appSettings.json_store_location.long)), {
      fillColor: '#84b1fa',
      fillOpacity: 0.1,
      radius: this.appSettingsService.appSettings.delivery_radius_m,
    })
    .addTo(this.map)
  }

  onMapClick(e:any) {
    this.tappedCoordinates = {
      lat: e.latlng.lat,
      lng: e.latlng.lng
    };
    this.onMapSelect.emit(this.tappedCoordinates)
    this.map.flyTo(latLng(this.tappedCoordinates.lat, this.tappedCoordinates.lng))
  }

  async initDirections(){
    let directions : any  = []
    const start : LatLng  = latLng(parseFloat(this.start.lat), parseFloat(this.start.long))
    const end : LatLng  = latLng(this.end.lat, this.end.long)
    const directionsArr = await this.mapService.generateDirection(start, end)
    directionsArr.forEach((val:any) => {
      directions.push({
        lng: val[0],
        lat: val[1],
      })
    });
    this.directionPL = polyline([...directions])
    this.directionPL.addTo(this.map)
    marker({
      lat: start.lat,
      lng: start.lng
    }, {
      icon: icon({
        iconUrl: '../../../assets/icon/location-dot-solid.svg'
      })
    })
    .bindTooltip(
      'Goods Food Hub', { permanent: true, direction: 'top', className: 'label' }
    )
    .openTooltip()
    .addTo(this.map)
    marker({
      lat: end.lat,
      lng: end.lng
    }, {
      icon: icon({
        iconUrl: '../../../assets/icon/motorcycle-solid.svg'
      })
    })
    .bindTooltip(
      'Delivery Location', { permanent: true, direction: 'top', className: 'label' }
    )
    .openTooltip()
    .addTo(this.map)
  }

}
