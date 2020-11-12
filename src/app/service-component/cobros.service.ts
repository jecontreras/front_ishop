import { Injectable } from '@angular/core';
import { COBROS } from '../interfas/sotarage';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class CobrosService {

  constructor(
    private _model: ServiciosService
  ) {
    // this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.querys<COBROS>('pagos/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<COBROS>('pagos', query, 'post');
  }
  update (query: any){
    return this._model.querys<COBROS>('pagos', query, 'put');
  }
}