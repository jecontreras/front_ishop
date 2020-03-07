import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/service-component/categoria.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ProductosService } from 'src/app/service-component/productos.service';
import { STORAGES } from 'src/app/interfas/sotarage';
import { Store } from '@ngrx/store';
import { BuscadorAction, CarritoAction } from 'src/app/redux/app.actions';
import { ModalController } from '@ionic/angular';
import { BuscadorComponent } from 'src/app/components/buscador/buscador.component';

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
  
  constructor(
    private _categoria: CategoriaService,
    private _productos: ProductosService,
    private _tools: ToolsService,
    private _store: Store<STORAGES>,
    private modalCtrl: ModalController
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

  loadData(ev){
    //console.log(ev);
    this.evScroll = ev;
    this.query.skip++;
    this.getProductos();
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
    this._categoria.get({}).subscribe((res:any)=>{
      console.log(res);
      this.listCategorias = res.data;
      if(!res.data[0]) this.listCategorias = [{id: 1, nombre:"Trajes de Baño"},{id: 2, nombre:"Zapatos"},{id: 3, nombre:"Camisas"}];
    },(error)=>this._tools.presentToast("Error de servidor"));
  }

  cambioCategoria(ev:any){
    let data:any = ev.detail.value;
    this.query.where.idSubCategoria = data.idSubcategoria;
    this.listProductos = [];
    this.getProductos();
  }

  getProductos(){
    console.log(this.query);
    this._tools.presentLoading();
    this._productos.get(this.query).subscribe((res:any)=>{
      this.listProductos = res.data;

      if( this.evScroll.target ){
        this.evScroll.target.complete()
      }

      this._tools.dismisPresent();
    },(error)=>{ 
      console.error(error); this._tools.presentToast("Error de servidor");this._tools.dismisPresent();if( this.evScroll.target ){ this.evScroll.target.complete() }
    });
  }

  openSearch(){
    this.modalCtrl.create({
      component: BuscadorComponent,
      componentProps: {
        obj: {}
      }
    }).then(modal=>modal.present());
  }

  submitCart(item:any){
    item.cantidadAduiridad = 1;
    let accion = new CarritoAction(item, 'post');
    this._store.dispatch(accion);
  }

}
