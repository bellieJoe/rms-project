import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private alertCtrl : AlertController,
    private errorHandler : ErrorHandlerService,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private productCategoryService : ProductCategoryService
  ) { }

  navState : any;
  category : any;

  async edit(){
    this.router.navigate(['/product-category/edit'], {
      state: {
        category: this.category
      }
    })
  }

  ngOnInit() {
    if(!this.router.getCurrentNavigation()?.extras.state ){
      location.href = "/";
    }
    this.navState = this.router.getCurrentNavigation()?.extras.state;
    this.category = this.navState.category
  }

  async archiveCategory(){
    const alert = await this.alertCtrl.create({
      message : "Are you sure you want to archive this Category?",
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Archive",
          handler : async () => {
            const loader = await this.loadingCtrl.create({
              message: "Archiving Product Category"
            })
            try {
              await loader.present()
              await this.productCategoryService.archive(this.category.id)
              const toast = await this.toastCtrl.create({
                message: "Product Category successfully archived",
                duration: 1000
              })
              this.router.navigate(['/product-category'])
              await toast.present()
              await loader.dismiss()
            } catch (error) {
              await loader.dismiss()
              this.errorHandler.handleError(error)
            }
          }
        }
      ]
    })
    alert.present()
  }

}
