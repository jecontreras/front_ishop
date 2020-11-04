import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { STORAGES } from 'src/app/interfas/sotarage';
import { CobrosService } from 'src/app/service-component/cobros.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { FormCobrosPage } from 'src/app/form/form-cobros/form-cobros.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cobros',
  templateUrl: './cobros.page.html',
  styleUrls: ['./cobros.page.scss'],
})
export class CobrosPage implements OnInit {
  
  query:any = {
    where:{},
    skip: 0
  };
  listRow:any = [];
  public ev:any = {};
  public disable_list:boolean = true;
  public evScroll:any = {};
  dataUser: any = {};
  disabled:boolean = false;
  
  constructor(
    private _cobros: CobrosService,
    private _store: Store<STORAGES>,
    private modalCtrl: ModalController,
    public _tools: ToolsService
  ) { }

  ngOnInit() {

  }

  storeProcess(){
    this._store.subscribe((store:any)=>{
      store = store.name;
      if( !store ) return false;
      // this.listRow = store.ordenes || [];
      this.dataUser = store.persona || {};
    });
  }
  async ionViewWillEnter(){
    this.storeProcess();
    console.log( this.listRow );
    if(Object.keys(this.listRow).length == 0) this.getOrdenes();
  }

  doRefresh(ev){
    this.ev = ev;
    this.disable_list = false;
    this.listRow = [];
    this.getOrdenes();
  }

  loadData(ev){
    //console.log(ev);
    this.evScroll = ev;
    this.query.skip++;
    this.getOrdenes();
  }

  getOrdenes(){
    this._tools.presentLoading();
    this.query.where.idPersona = this.dataUser.id;
    this._cobros.get( this.query ).subscribe((res:any)=>{
      this.dataFormaList(res);
    },error=>{ console.error(error); this._tools.presentToast("Error de servidor")});
  }
  
  dataFormaList(res:any){
    //this.PushStoreOrdenes( res.data );
    this.listRow.push(...res.data );
    //console.log(this.listRow)
    this.listRow =_.unionBy(this.listRow || [], res.data, 'id');
    if( this.evScroll.target ){
      this.evScroll.target.complete()
    }
    if(this.ev){
      this.disable_list = true;
      if(this.ev.target){
        this.ev.target.complete();
      }
    }
    this._tools.dismisPresent();
  }

  agregar( obj:any ){
   this.modalCtrl.create({
      component: FormCobrosPage,
      componentProps: {
        obj: obj
      }
    }).then(modal=>modal.present());
  }

  async eliminar( item ){
    let result:any = await this._tools.presentAlertConfirm( { header: "Deseas eliminar Orden"} );
    if( !result ) return false;
    if( item.estado == 0 ) {
      this.disabled = true;
      this._cobros.update( { id: item.id,  estado: 2 }).subscribe(( res:any )=> { 
        item.estado = 2;
        this.disabled = false;
        this._tools.presentToast("Eliminado Exitos");
      },( erro:any )=> { this._tools.presentToast("Eliminado Error"); this.disabled = false; });
    }else this._tools.presentToast("lo sentimos no podemos procesar su acción");
  }

}
