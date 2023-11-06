import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { 
  ImgCropperConfig, 
  ImgCropperErrorEvent, 
  ImgCropperEvent,
  ImgCropperLoaderConfig,
  LyImageCropper,
  STYLES as CROPPER_STYLES 
} from '@alyle/ui/image-cropper';
import { LySliderChange } from '@alyle/ui/slider';
import { StyleRenderer, ThemeRef, ThemeVariables, lyl } from '@alyle/ui';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProductItemService } from 'src/app/services/product-item.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

const STYLES = (_theme: ThemeVariables, ref: ThemeRef) => {
  ref.renderStyleSheet(CROPPER_STYLES);
  return {
    cropper: lyl `{
      height: 300px
    }`,
    cropperResult: lyl `{
      position: relative
      width: auto
      height: auto
    }`,
    sliderContainer: lyl `{
      text-align: center
      margin: 14px
    }`
  };
};


@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent  implements OnInit {

  constructor(
    private errorHandler : ErrorHandlerService,
    private productItemService : ProductItemService,
    private router : Router,
    readonly sRenderer: StyleRenderer,
    private loadingCtrl: LoadingController,
    private toastCtrl : ToastController
  ) { }

  @Input() showUploadBtn : boolean | undefined | null;
  @Input() product : any;
  @Output() onUpload = new EventEmitter<any>()

  classes = this.sRenderer.renderSheet(STYLES);
  croppedImage?: string | null = null;
  scale!: number;
  ready = false;
  minScale!: number;
  @ViewChild(LyImageCropper) readonly cropper!: LyImageCropper;
  myConfig: ImgCropperConfig = {
    // autoCrop: true,
    width: 150, // Default `250`
    height: 150, // Default `200`
    fill: '#ff2997', // Default transparent if type == png else #000
    type: 'image/png', // Or you can also use `image/jpeg`
    responsiveArea: true
  };

  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e.dataURL;
    console.log('cropped img: ', e);
    
  }
  onLoaded(e: ImgCropperEvent) {
    console.log('img loaded', e);
  }
  onError(e: ImgCropperErrorEvent) {
    console.warn(`'${e.name}' is not a valid image`, e);
  }
  onSliderInput(event: LySliderChange) {
    this.scale = event.value as number;
  }

  async uploadImage(){
    this.onUpload.emit(this.croppedImage)
  }

  async ngOnInit() {
    // if(!this.router.getCurrentNavigation()?.extras.state ){
    //   location.href = "/";
    // }
    // this.navState = this.router.getCurrentNavigation()?.extras.state;
    // this.product = this.navState.product
  }

}
