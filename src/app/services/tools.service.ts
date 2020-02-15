import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  
  loading:any;

  constructor(
    public toastCtrl: ToastController,
    public loadingCrl: LoadingController
  ) { }
 
  async presentToast(mensaje:string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
  
  async presentLoading(mensaje:string = "") {
    this.loading = await this.loadingCrl.create({
      message: mensaje || 'Please wait...',
      duration: 2000
    });
    await this.loading.present();
  }
  async dismisPresent(){
    await this.loading.onDidDismiss();
  }

}
