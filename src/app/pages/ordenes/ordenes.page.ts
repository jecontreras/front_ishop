import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/service-component/ordenes.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ModalController } from '@ionic/angular';
import { FormordenesPage } from 'src/app/form/formordenes/formordenes.page';
import { BuscadorComponent } from 'src/app/components/buscador/buscador.component';
import * as _ from 'lodash';
import { STORAGES } from 'src/app/interfas/sotarage';
import { Store } from '@ngrx/store';
import { OrdenesAction } from 'src/app/redux/app.actions';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.page.html',
  styleUrls: ['./ordenes.page.scss'],
})
export class OrdenesPage implements OnInit {
  query:any = {
    where:{},
    skip: 0
  };
  listOrdenes:any = [];
  public ev:any = {};
  public disable_list:boolean = true;
  public evScroll:any = {};

  constructor(
    private _ordenes: OrdenesService,
    private _tools: ToolsService,
    private modalCtrl: ModalController,
    private _store: Store<STORAGES>,
  ) { 
    this.storeProcess();
  }

  ngOnInit() {
    
  }
  storeProcess(){
    this._store.subscribe((store:any)=>{
      store = store.name;
      this.listOrdenes = store.ordenes || [];
    });
  }
  async ionViewWillEnter(){
    this.storeProcess();
    console.log( this.listOrdenes );
    if(Object.keys(this.listOrdenes).length == 0) this.getOrdenes();
  }

  doRefresh(ev){
    this.ev = ev;
    this.disable_list = false;
    this.listOrdenes = [];
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
    this._ordenes.get(this.query).subscribe((res:any)=>{
      this.dataFormaList(res);
    },error=>{ console.error(error); this._tools.presentToast("Error de servidor")});
  }
  
  dataFormaList(res:any){
    this.PushStoreOrdenes( res.data );
    this.listOrdenes.push(...res.data );
    //console.log(this.listOrdenes)
    this.listOrdenes =_.unionBy(this.listOrdenes || [], res.data, 'id');
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

  PushStoreOrdenes(menus){
    for(let row of menus){
      let idx = this.listOrdenes.find(item => item.id == row.id);
      if(!idx){
        let accion = new OrdenesAction(row, 'post');
        this._store.dispatch(accion);
      }
    }
  }

  openSearch(){
    this.modalCtrl.create({
      component: BuscadorComponent,
      componentProps: {
        obj: true
      }
    }).then(modal=>modal.present());
  }

  agregar( obj:any ){
   this.modalCtrl.create({
      component: FormordenesPage,
      componentProps: {
        obj: obj
      }
    }).then(modal=>modal.present()); 
  }

}
