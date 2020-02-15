import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { ServiciosService } from '../services/servicios.service';
import { STORAGES } from '../interfas/sotarage';

@Injectable({
  providedIn: 'root'
})
export class ReduxserService {

  constructor(
    private _model: ServiciosService,
    private _store: Store<STORAGES>,
  ) {
    
    // this.cuerpo = this._model;
  }
  data_redux(data: any, modelo:any, lista:any){
    let accion:any;
    // if(modelo === 'negocios') 
    // {
    //   let accion = new NegociosAction({}, 'drop');
    //   this._store.dispatch(accion);
    // }
    if(!data) return false;
    if(Object.keys(data).length === 0) return false;
    for(let row of data){
        let idx = lista.find(item => item.id == row.id);
        /*if(modelo === 'negocios') {
            if(idx) accion = new NegociosAction(row, 'put');
            else accion = new NegociosAction(row, 'post');
        }
        if(accion) this._store.dispatch(accion);*/
      }
  }
  delete_data(modelo:any, lista:any){
    let accion:any;
    /*if(modelo === 'articulos'){
      accion = new ArticulosAction({hola:"jeje"}, 'drop');
    }
    if(accion) this._store.dispatch(accion);*/
  }
}