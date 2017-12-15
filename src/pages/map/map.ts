import { Component, ViewChild, ElementRef } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public confData: ConferenceData, public platform: Platform) {
  }

  ionViewDidLoad() {

      this.confData.getMap().subscribe((mapData: any) => {
        let mapEle = this.mapElement.nativeElement;

        let map = new google.maps.Map(mapEle, {
          center: mapData.find((d: any) => d.center),
          zoom: 16
        });

        mapData.forEach((markerData: any) => {
          let infoWindow = new google.maps.InfoWindow({
            content: `<h5>${markerData.name}</h5>`
          });

          let marker = new google.maps.Marker({
            position: markerData,
            map: map,
            title: markerData.name
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });

        google.maps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });

      });

  }
}

// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { GoogleMaps, 
//         GoogleMap,
//         GoogleMapsEvent,
//         GoogleMapOptions,
//         CameraPosition,
//         MarkerOptions,
//         Marker } from '@ionic-native/google-maps';

// /**
// * Generated class for the MapPage page.
// *
// * See https://ionicframework.com/docs/components/#navigation for more info on
// * Ionic pages and navigation.
// */

// @IonicPage()
// @Component({
//   selector: 'page-map',
//   templateUrl: 'map.html',
// })
// export class MapPage {
  
//   map: GoogleMap;

//   constructor(private GoogleMaps: GoogleMaps, public navCtrl: NavController, public navParams: NavParams) {
//   }

//   ionViewDidLoad() {
//   this.loadMap();
//   }

// loadMap() {

//     let mapOptions: GoogleMapOptions = {
//       camera: {
//         target: {
//           lat: 43.0741904,
//           lng: 104.8244
//         },
//         zoom: 18,
//         tilt: 30
//       }
//     };

//     this.map = GoogleMaps.create('map_canvas', mapOptions);

//     // Wait the MAP_READY before using any methods.
//     this.map.one(GoogleMapsEvent.MAP_READY)
//       .then(() => {
//         console.log('Map is ready!');
//       });
//   }
// }
