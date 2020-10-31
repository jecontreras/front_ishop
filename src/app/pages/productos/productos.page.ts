import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/service-component/categoria.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ProductosService } from 'src/app/service-component/productos.service';
import { STORAGES } from 'src/app/interfas/sotarage';
import { Store } from '@ngrx/store';
import { BuscadorAction, CarritoAction } from 'src/app/redux/app.actions';
import { ModalController } from '@ionic/angular';
import { BuscadorComponent } from 'src/app/components/buscador/buscador.component';
import * as _ from 'lodash';
import { ArchivoService } from 'src/app/service-component/archivo.services';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage  {

  listCategorias:any = [];
  listProductos:any = [];
  buscadorStore:any = {};
  query:any = {
    where:{
      estado: 0
    },
    skip: 0
  };
  public slideOpts = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay: false
  };
  public evScroll:any = {};
  public ev:any = {};
  public disable_list:boolean = true;
  
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };
  selecciono:any = "";

  constructor(
    private _categoria: CategoriaService,
    private _productos: ProductosService,
    public _tools: ToolsService,
    private _store: Store<STORAGES>,
    private modalCtrl: ModalController,
    private _archivos: ArchivoService
  ) { 
    this.storeProcess();
    this.getCategoria();
  }

  async ionViewWillEnter(){
    this.storeProcess();
    this.getSearch();
  }

  storeProcess(){
    let buscadorTxt = {};
    this._store.subscribe((store:any)=>{
      console.log(store);
      store = store.name;
      buscadorTxt = store.buscador;
    });
    this.buscadorStore = buscadorTxt;
    this.deleteStoreBuscador();
  }

  doRefresh(ev){
    this.ev = ev;
    this.disable_list = false;
    this.listProductos = [];
    this.query.skip = 0;
    this.getSearch();
  }
  
  loadData(ev){
    //console.log(ev);
    this.evScroll = ev;
    this.query.skip++;
    this.getSearch();
  }
  
  getSearch(){
    if(this.buscadorStore.opt === "categoria")this.query.where.idSubCategoria = this.buscadorStore.value;
    this.getProductos();
  }

  limpiarBuscador(){
    this.query = {where:{}};
    this.getProductos();
  }
  
  deleteStoreBuscador(){
    let accion = new BuscadorAction({}, 'delete');
    this._store.dispatch(accion);
  }

  getCategoria(){
    this._categoria.get({ where:{ estado: 0 } }).subscribe((res:any)=>{
      this.listCategorias = res.data;
      if(!res.data[0]) this.listCategorias = [{id: 1, nombre:"Trajes de Baño"},{id: 2, nombre:"Zapatos"},{id: 3, nombre:"Camisas"}];
    },(error)=>this._tools.presentToast("Error de servidor"));
  }

  openProducto(){

  }

  cambioCategoria(ev:any){
    let data:any = ev.detail.value;
    this.query.where.idSubCategoria = data.id;
    this.listProductos = [];
    this.query.skip = 0;
    this.getProductos();
  }

  getProductos(){
    this._tools.presentLoading();
    this._productos.get(this.query).subscribe((res:any)=>{
      this.listProductos.push(...res.data );
      this.listProductos =_.unionBy(this.listProductos || [], res.data, 'id');
      
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

    },(error)=>{console.error(error); this._tools.presentToast("Error de servidor")})
  }

  openSearch(){
    this.modalCtrl.create({
      component: BuscadorComponent,
      componentProps: {
        obj: {}
      }
    }).then(modal=>modal.present());
  }
  validandoCart( item:any ){
    console.log( item );
    if( item.colores.length > 0 || item.tallas.length > 0) this.selecciono = item;
    else this.submitCart( item );
  }
  submitCart(item:any){
    item.cantidadAduiridad = 1;
    let accion = new CarritoAction(item, 'post');
    this._store.dispatch(accion);
    this._tools.presentToast("Agregado al Carro");
  }
  
  async compartir( off ){
    let result:boolean = await this._archivos.compartir( { title: off.titulo, subtitle:'',foto: off.foto, url:'' } );
  }
  async compartir2( off ){
    let result:boolean = await this._archivos.compartir2( { title: off.titulo, subtitle:'',foto: off.foto, url:'' } );
  }

}
