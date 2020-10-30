import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';
import { ORDENES } from '../interfas/sotarage';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  constructor(
    private _model: ServiciosService
  ) { }
  
  get(query: any){
    return this._model.querys<ORDENES>('facturas/querys', query, 'post');
  }

  update(query: any){
    return this._model.querys<ORDENES>('facturas/'+query.id, query, 'put');
  }
  
  getArticulo(query: any){
    return this._model.querys<ORDENES>('facturasArticulos/querys', query, 'post');
  }

  saved (query: any){
    return this._model.querys<ORDENES>('facturas', query, 'post');
  }
}
