import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { BancosService } from 'src/app/service-component/bancos.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-form-bancos',
  templateUrl: './form-bancos.page.html',
  styleUrls: ['./form-bancos.page.scss'],
})
export class FormBancosPage implements OnInit {
  
  listBancos:any = [];
  btnDisabled:boolean = false;
  data:any = {};

  constructor(
    private navparams: NavParams,
    public _tools: ToolsService,
    private modalCtrl: ModalController,
    private _bancos: BancosService
  ) { }

  ngOnInit() {
    this.getBancos();
  }

  getBancos(){
    this._bancos.get( { where: { estado: 0 } } ).subscribe(( res:any )=>{
      this.listBancos = res.data;
    });
  }

  submit(){
    if( this.btnDisabled ) return false;
    this.btnDisabled = true;
    this._bancos.saved( this.data ).subscribe(( res:any )=>{
      this._tools.presentToast("Agregado");
      this.data = {};
      this.btnDisabled = false;
      this.listBancos.push( res );
    },( error:any )=> { this._tools.presentToast("Error al servidor"); this.btnDisabled = false; });
  }

  close(){
    this.modalCtrl.dismiss();
  }

}
