import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import * as L from 'leaflet'
import 'leaflet-control-geocoder';


axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  private map: any | L.Map;

  constructor() {}

  ngOnInit() {
    this.initMap();
    this.addTileLayer();
  }

  private initMap(): void {
    this.map = L.map('map').setView([0, 0], 2);
  }

  private addTileLayer(): void {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add a click event listener to the map for custom geocoding
    this.map.on('click', this.handleMapClick.bind(this));
  }

  private async handleMapClick(event: L.LeafletMouseEvent): Promise<void> {
    const { latlng } = event;
    const reverseGeocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`;

    try {
      const response = await axios.get(reverseGeocodeUrl);
      const result = response.data;

      console.log('Reverse Geocode Result:', result);
      // You can now use the reverse geocoding result as needed
    } catch (error) {
      console.error('Reverse Geocoding error:', error);
    }
  }

}
