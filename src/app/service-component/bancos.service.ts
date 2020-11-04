import { Injectable } from '@angular/core';
import { BANCOS } from '../interfas/sotarage';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class BancosService {

  constructor(
    private _model: ServiciosService
  ) {
    // this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.querys<BANCOS>('bancos/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<BANCOS>('bancos', query, 'post');
  }
  update (query: any){
    return this._model.querys<BANCOS>('bancos', query, 'put');
  }
}