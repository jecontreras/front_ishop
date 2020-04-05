import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/service-component/categoria.service';
import { ProductosService } from 'src/app/service-component/productos.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfas/sotarage';
import { Store } from '@ngrx/store';
import { BuscadorAction, CarritoAction } from 'src/app/redux/app.actions';
import * as _ from 'lodash';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
})
export class OfertasPage {

  listCategorias:any = [];
  listProductos:any = [];
  buscadorStore:any = {};
  query:any = {
    where:{
      precioOferta: { '!=' : 0},
      estado: 0
    }
  };
  public ev:any = {};
  public disable_list:boolean = true;
  public evScroll:any = {};

  constructor(
    private _categoria: CategoriaService,
    private _productos: ProductosService,
    private _tools: ToolsService,
    private _store: Store<STORAGES>
  ) { 
    
    this.storeProcess();

  }
  storeProcess(){
    let buscadorTxt = {};
    this._store.subscribe((store:any)=>{
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
    this.getSearch();
  }
  
  loadData(ev){
    //console.log(ev);
    this.evScroll = ev;
    this.query.skip++;
    this.getSearch();
  }

  async ionViewWillEnter(){
    this.storeProcess();
    this.getCategoria();
    this.getSearch();
  }
  
  getSearch(){
    if(this.buscadorStore.opt === "categoria")this.query.where.idSubCategoria = this.buscadorStore.value;
    this.getProductos();
  }
  limpiarBuscador(){
    this.query = {where:{ ofertas: true }};
    this.getProductos();
  }
  deleteStoreBuscador(){
    let accion = new BuscadorAction({}, 'delete');
    this._store.dispatch(accion);
  }
  getCategoria(){
    this._categoria.get({ where:{ estado:0 } }).subscribe((res:any)=>{
      this.listCategorias = res.data;
      if(!res.data[0]) this.listCategorias = [{id: 1, nombre:"Trajes de Baño"},{id: 2, nombre:"Zapatos"},{id: 3, nombre:"Camisas"}];
    },(error)=>this._tools.presentToast("Error de servidor"));
  }
  cambioCategoria(ev:any){
    
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

  submitCart(item:any){
    item.cantidadAduiridad = 1;
    let accion = new CarritoAction(item, 'post');
    this._store.dispatch(accion);
    this._tools.presentToast("Agregado al Carro");
  }


}
