import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

import Quagga from 'quagga';
// const Quagga: any = await import('quagga');

@Component({
  selector: 'app-barcode-reader',
  templateUrl: './barcode-reader.page.html',
  styleUrls: ['./barcode-reader.page.scss'],
})
export class BarcodeReaderPage implements OnInit {

  constructor(
    private alertCtrl : AlertController
  ) { }

  @ViewChild('videoInput') videoInput: ElementRef|any;

  ngOnInit() {
    
  }
  ionViewDidEnter(){
    this.initScanner();
  }

  async initScanner() {
    const codeReader = new BrowserMultiFormatReader();

    try {
      const videoInputDevice = await this.selectVideoInput();
      codeReader.decodeFromVideoDevice(videoInputDevice, this.videoInput.nativeElement, (result, error) => {
        if (result) {
          console.log('Barcode result:', result.getText());
          // Handle the barcode result
        }
        if (error && !(error instanceof NotFoundException)) {
          alert('Error decoding barcode:' + error)
          console.error('Error decoding barcode:', error);
        }
      });
    } catch (err) {
      alert('Error initializing scanner:' + err)
      console.error('Error initializing scanner:', err);
    }
  }

  async selectVideoInput() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    if (videoDevices.length === 0) {
      // const alert = await this.alertCtrl.create({
      //   error
      // })
      throw new Error('No video input devices found');
      alert('No video input devices found')
    }
    return videoDevices[0].deviceId;
  }
}
