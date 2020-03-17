import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/service-component/ordenes.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ModalController } from '@ionic/angular';
import { FormordenesPage } from 'src/app/form/formordenes/formordenes.page';
import { BuscadorComponent } from 'src/app/components/buscador/buscador.component';
import * as _ from 'lodash';

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
  ) { }

  ngOnInit() {
    
  }

  async ionViewWillEnter(){

    this.getOrdenes();
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

  openSearch(){
    this.modalCtrl.create({
      component: BuscadorComponent,
      componentProps: {
        obj: {}
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
