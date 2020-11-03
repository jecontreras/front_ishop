import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { STORAGES } from 'src/app/interfas/sotarage';
import { ModalController } from '@ionic/angular';
import { BuscadorComponent } from 'src/app/components/buscador/buscador.component';
import { HomeService } from 'src/app/service-component/home.service';
import { ToolsService } from 'src/app/services/tools.service';
import { NameappAction } from 'src/app/redux/app.actions';
import { ComponentsModule } from 'src/app/components/components.module';
import { ResumenPersonaService } from 'src/app/service-component/resumen-persona.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  dataUser:any = {};
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };
  data_app:any = [];
  slideOpts = {
    slidesPerView: 2.6,
    freeMode: true
  }; 
  public ev:any = {};
  public disable_list:boolean = true;
  dataResumen:any = {};

  constructor( 
    private _store: Store<STORAGES>,
    private modalCtrl: ModalController,
    private _home: HomeService,
    public _tools: ToolsService,
    private Router: Router,
    private _resumenPersona: ResumenPersonaService
  ) {
    this.storeGet();
    if( Object.keys(this.data_app).length == 0 ) this.getHome();
    console.log("*****************************pasando--------------------->>>>>>>>>>>>>>>")
  }

  ngOnInit() {
    this.getResumen();  
  }
  
  getResumen(){
    this._resumenPersona.get( { where: { idPersona: this.dataUser.id }, limit: 1 } ).subscribe(( res:any )=>{
      this.dataResumen = res.data[0] || {};
    });
  }

  storeGet(){
    this._store.subscribe((store:any)=>{
      store = store.name;
      this.dataUser = store.persona || {};
      // this.data_app = store.nameapp || [];
    });
  }
  async ionViewWillEnter(){
    this.storeGet();
    if( Object.keys(this.data_app).length == 0 ) this.getHome();
  }
  doRefresh(ev){
    this.ev = ev;
    this.disable_list = false;
    this.data_app = [];
    this.getHome();
  }

  getHome(){
    this._home.get({ where: {} }).subscribe((res:any)=> this.dataFormatHome(res), (error)=> this._tools.presentToast("Error de servidor"));
  }

  dataFormatHome(res:any){
    // for(let row of res.data){
    //   let filtro:any = this.data_app.find(item => item.id == row.id);
    //   if(!filtro){
    //     let accion = new NameappAction( row, 'post');
    //     this._store.dispatch(accion);
    //   }
    // }
    this.data_app.push(...res.data );
    if(this.ev){
      this.disable_list = true;
      if(this.ev.target){
        this.ev.target.complete();
      }
    }
  }

  openProducto( item:any, info:any ){
    if( info.tipo == 'articulos') this.Router.navigate( [ '/tabs/productoView', item .id ] );
  }

  openSearch(){
    this.modalCtrl.create({
      component: BuscadorComponent,
      componentProps: {
        obj: {}
      }
    }).then(modal=>modal.present());
  }

  compartir(obj:any){
    console.log(obj);
  }

}
