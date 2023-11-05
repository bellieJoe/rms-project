import { Component, OnInit, ViewChild, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProductItemService } from 'src/app/services/product-item.service';
import { DatePipe } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
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
  selector: 'app-change-image',
  templateUrl: './change-image.page.html',
  styleUrls: ['./change-image.page.scss'],
})

export class ChangeImagePage implements OnInit {
  
  navState : any;
  product : any;

  constructor(
    private errorHandler : ErrorHandlerService,
    private productItemService : ProductItemService,
    private router : Router,
    readonly sRenderer: StyleRenderer,
    private loadingCtrl: LoadingController,
    private toastCtrl : ToastController
  ) { }

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

  ngAfterViewInit() {

    // demo: Load image from URL and update position, scale & rotate
    // this is supported only for browsers
    // if (this._platform.isBrowser) {
    //   const config: ImgCropperLoaderConfig = {
    //     scale: 0.745864772531767,
    //     xOrigin: 642.380608078103,
    //     yOrigin: 236.26357452128866,
    //     // areaWidth: 100,
    //     // areaHeight: 100,
    //     rotation: 0,
    //     originalDataURL: 'https://firebasestorage.googleapis.com/v0/b/alyle-ui.appspot.com/o/img%2Flarm-rmah-47685-unsplash-1.png?alt=media&token=96a29be5-e3ef-4f71-8437-76ac8013372c'
    //   };
    //   this.cropper.loadImage(config);
    // }

  }

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
    const loader = await this.loadingCtrl.create({
      message: 'Uploading Image',
      backdropDismiss: false,
      spinner: 'lines'
    })
    const toast = await this.toastCtrl.create({
      message: "Image Uploaded Successfully",
      icon: 'checkmark-circle',
      duration: 2000
    })
    try {
      await loader.present()
      const res = await this.productItemService.uploadImage({
        image: this.croppedImage
      })
      console.log(res)
      toast.present()
      await loader.dismiss()
    } catch (error) {
      await loader.dismiss()
      console.log(error)
      this.errorHandler.handleError(error)
    }
  }

  async ngOnInit() {
    if(!this.router.getCurrentNavigation()?.extras.state ){
      location.href = "/";
    }
    this.navState = this.router.getCurrentNavigation()?.extras.state;
    this.product = this.navState.product
  }

}
