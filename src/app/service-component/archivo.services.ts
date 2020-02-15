import { Injectable } from '@angular/core';
import * as _ from 'lodash';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(
    private _model: ServiciosService,
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
