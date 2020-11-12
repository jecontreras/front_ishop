import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { STORAGES } from 'src/app/interfas/sotarage';
import { BancosService } from 'src/app/service-component/bancos.service';
import { CobrosService } from 'src/app/service-component/cobros.service';
import { ResumenPersonaService } from 'src/app/service-component/resumen-persona.service';
import { ToolsService } from 'src/app/services/tools.service';
import { FormBancosPage } from '../form-bancos/form-bancos.page';

@Component({
  selector: 'app-form-cobros',
  templateUrl: './form-cobros.page.html',
  styleUrls: ['./form-cobros.page.scss'],
})
export class FormCobrosPage implements OnInit {
  
  titulo:string = 'Solicitando';
  data:any = {
    vendedor: {},
  };
  dataUser:any = {};
  btnDisabled:boolean = false;
  evento:any = {};
  listBancos:any = [];
  dataResumen:any = {};

  constructor(
    private modalCtrl: ModalController,
    private _store: Store<STORAGES>,
    private _cobros: CobrosService,
    private navparams: NavParams,
    public _tools: ToolsService,
    private _bancos: BancosService,
    private _resumenPersona: ResumenPersonaService
  ) { 

    this._store.subscribe((store:any)=>{
      store = store.name;
      this.dataUser = store.persona || {};
    });

  }

  ngOnInit() {
    this.evento = this.navparams.get('obj');
    if( this.evento ){
      this.data = this.evento || {};
      this.data.monto2 = this._tools.monedaChange( 3, 2, ( this.evento.monto || 0 ) );
    }else{
      this.data = {
        nombreVendedor: this.dataUser.nombre + this.dataUser.apellido,
        numeroWhatVendedor: this.dataUser.celular,
        documentoVendedor: this.dataUser.cedula,
        detalle: "Hola Gente ishop solicitar mi retiro gracias",
        ... this.data
      }
      this.getResumen();
    }
    this.getBancos();
  }

  getResumen(){
    this._resumenPersona.get( { where: { idPersona: this.dataUser.id }, limit: 1 } ).subscribe(( res:any )=>{
      this.dataResumen = res.data[0] || {};
      this.data.monto2 = this._tools.monedaChange( 3, 2, ( this.dataResumen.gananciasVentasTotales || 0 ) );
      this.data.monto = this.dataResumen.gananciasVentasTotales || 0;
    });
  }

  getBancos(){
    this._bancos.get( { where: { estado: 0 } } ).subscribe(( res:any )=>{
      this.listBancos = res.data;
    });
  }

  close(){
    this.modalCtrl.dismiss();
  }

  async submit(){
    this.btnDisabled = true;
    if( !this.data.id ) { 
     let validando:boolean = this.validador( this.data );
     if( !validando ) { this.btnDisabled = false; return false; }
     let result:any =  await this.agregar( this.data );
     if( result ) this.close();
    }
    this.btnDisabled = false;
  }

  async agregar( data ){
    return new Promise( resolve =>{
      this.data.idPersona = this.dataUser.id;
      this._cobros.saved( data ).subscribe(( res:any )=>{
        this._tools.presentToast( "Datos guardados" );
        resolve( res );
      },( error:any )=> { this._tools.presentToast("Error al guardar los registros vuelva a intentarlo"); resolve( false ); });
    });
  }

  validador( data ):boolean {
    if( !data.nombreVendedor ) { this._tools.presentToast( "Error falta el nombre del vendedor" ); return false; }
    if( !data.numeroWhatVendedor ) { this._tools.presentToast( "Error falta el numero de whatsapp del vendedor" ); return false; }
    if( !data.documentoVendedor ) { this._tools.presentToast( "Error falta el documento del vendedor" ); return false; }
    if( !data.idBanco ) { this._tools.presentToast( "Error falta el Banco" ); return false; }
    return true;
  }

  openBancos(){
    this.modalCtrl.create({
      component: FormBancosPage,
      componentProps: {
        obj: true
      }
    }).then(modal=>modal.present());
    this.getBancos();
  }

}
