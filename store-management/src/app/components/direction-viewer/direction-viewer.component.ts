import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Icon, icon, LatLng, latLng, LatLngBoundsExpression, LatLngExpression, Map, MapOptions, Marker, marker, Point, Polygon, polyline, tileLayer } from 'leaflet';
import { Coordinates } from 'src/app/interfaces/form-inputs';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-direction-viewer',
  templateUrl: './direction-viewer.component.html',
  styleUrls: ['./direction-viewer.component.scss'],
})
export class DirectionViewerComponent  implements OnInit {


  constructor(
    private mapService : MapService
  ) {
    
   }


  async ngOnInit() {
    setTimeout(() => {
      this.isDisplayed = true
    }, 900);
  }

  isDisplayed : boolean = false
  @Input() location : any
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
  
  async onMapReady(map: Map) {
    
    this.map = map;
    this.map.on('click', this.onMapClick.bind(this));
    await this.initDirections()
    this.map.flyTo(latLng(13.4449707, 121.8299243))
    console.log("ok")
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
    const start : LatLng  = latLng(13.4449707, 121.8299243)
    const end : LatLng  = latLng(this.location.lat, this.location.long)
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
