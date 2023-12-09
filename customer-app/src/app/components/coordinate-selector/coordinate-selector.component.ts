import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { circle, Icon, icon, latLng, Map, MapOptions, Marker, marker, Point, Polygon, tileLayer } from 'leaflet';
import { AppSettingsService } from 'src/app/services/app-settings.service';

@Component({
  selector: 'app-coordinate-selector',
  templateUrl: './coordinate-selector.component.html',
  styleUrls: ['./coordinate-selector.component.scss'],
})
export class CoordinateSelectorComponent  implements OnInit {

  constructor(
    private appSettingsService : AppSettingsService
  ) {
    this.mapOptions = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 13,
      center: latLng(13.4481,121.8381) // Default center coordinates
    };
   }

  ngOnInit() {
    setTimeout(() => {
      this.isDisplayed = true
    }, 900);

  }
  isDisplayed : boolean = false
  @Output() onMapSelect = new EventEmitter<any>
  map!: Map
  mapOptions!: MapOptions
  tappedCoordinates: { lat: number, lng: number } = {lat: 0, lng: 0}
  tapMarker : Marker = new Marker({
    lat: 13.4481,
    lng: 121.838
  })
  
  onMapReady(map: Map) {
    this.map = map;
    this.map.on('click', this.onMapClick.bind(this));
    circle(latLng(parseFloat(this.appSettingsService.appSettings.json_store_location.lat),parseFloat(this.appSettingsService.appSettings.json_store_location.long)), {
      color: '#1a5bc4',
      fillColor: '#84b1fa',
      fillOpacity: 0.5,
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
    this.tapMarker.setLatLng({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    })
    .setIcon(icon({
      iconUrl: '../../../assets/icon/location-dot-solid.svg'
    }))
    .addTo(this.map)
  }

}
