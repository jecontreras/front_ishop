import { Injectable } from '@angular/core';
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform } from '@ionic/angular';
import * as _ from 'lodash';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(
    private platform: Platform,
    private _model: ServiciosService,
    //private socialSharing: SocialSharing
    // private transfer: FileTransfer
  ) {
  }
  get(query: any){
    return this._model.querys<ARCHIVO>('galeria/querys', query, 'post');
  }
  saved (query: any){
    let postData = new FormData();
    for(let row of query.img){
      row.img = postData.append('file', row);
    }
    // console.log(query);
    return this._model.querys<ARCHIVO>('galeria/file', query, 'post');
  }
  
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  async compartir( item ){
    if( this.platform.is('cordova') ){
      // let foto:any = await this.getBase64( item.foto );
      // await this.socialSharing.share(
      //   item.title,
      //   item.subtitle,
      //   item.foto,
      //   item.url
      // );
    }
    return true;
  }

  async compartir2( item ){
    var options = {
      message: 'share this', // not supported on some apps (Facebook, Instagram)
      subject: 'the subject', // fi. for email
      files: [ item.foto, item.foto ], // an array of filenames either locally or remotely
      url: 'https://www.website.com/foo/#bar?a=b',
    };
    // let result = await this.socialSharing.shareWithOptions(options);
    // console.log( "**************", result );
    // if( this.platform.is('cordova') ){
    //   let foto:any = await this.getBase64( item.foto );
    //   await this.socialSharing.share(
    //     item.title,
    //     item.subtitle,
    //     [ foto, foto ],
    //     item.url
    //   );
    // }
    return true;
  }

  // async upload(file_array:any, data:any){
  //   let FileTransfer: FileTransferObject = this.transfer.create();

  //   let random = Math.floor(Math.random() * 100);

  //   let options: FileUploadOptions = {
  //     fileKey: 'photo',
  //     fileName: "myImage_"+ random + ".jpg", 
  //     chunkedMode: false,
  //     httpMethod: "post",
  //     mimeType: "image/jpeg",
  //     headers: {},
  //     params: {
  //       data: data
  //     }
      
  //   };
  //   console.log("la porrta", file_array)
  //   file_array.forEach((row: any)=>{
  //     return FileTransfer.upload(row, GLOBAL.url+"galeria/file", options)
  //     .then((file:any)=>{
  //       console.log("el men",file);
  //       return file;
  //     }, (err)=>{
  //       alert("Error");
  //     })
  //   });
  //   return true;
  // }

}

export interface ARCHIVO {

};
