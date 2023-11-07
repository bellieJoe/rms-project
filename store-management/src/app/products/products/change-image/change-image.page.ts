import { Component, OnInit, ViewChild, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProductItemService } from 'src/app/services/product-item.service';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';



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
    private loadingCtrl: LoadingController,
    private toastCtrl : ToastController
  ) { }

  @ViewChild(ImageCropperComponent) imgCropper! : ImageCropperComponent

  // croppedImage?: string | null = this.imgCropper.croppedImage;

  async uploadImage(croppedImage :  any){
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
        image: croppedImage,
        id: this.product.id
      })
      console.log(res)
      this.router.navigate(['/products'])
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
