import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/service-component/categoria.service';
import { ProductosService } from 'src/app/service-component/productos.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfas/sotarage';
import { Store } from '@ngrx/store';
import { BuscadorAction } from 'src/app/redux/app.actions';

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
      console.log(store);
      store = store.name;
      buscadorTxt = store.buscador;
    });
    this.buscadorStore = buscadorTxt;
    this.deleteStoreBuscador();
  }
  async ionViewWillEnter(){
    console.log("heyy");
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
    this._categoria.get({}).subscribe((res:any)=>{
      console.log(res);
      this.listCategorias = res.data;
      if(!res.data[0]) this.listCategorias = [{id: 1, nombre:"Trajes de Baño"},{id: 2, nombre:"Zapatos"},{id: 3, nombre:"Camisas"}];
    },(error)=>this._tools.presentToast("Error de servidor"));
  }
  cambioCategoria(ev:any){
    
  }
  getProductos(){
    console.log(this.query);
    this._productos.get(this.query).subscribe((res:any)=>{
      this.listProductos = res.data;
    },(error)=>{console.error(error); this._tools.presentToast("Error de servidor")})
  }


}
