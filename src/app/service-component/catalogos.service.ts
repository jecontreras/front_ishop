import { Injectable } from '@angular/core';
import { CATALOGOS } from '../interfas/sotarage';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(
    private _model: ServiciosService
  ) {
    // this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.querys<CATALOGOS>('pagos/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<CATALOGOS>('pagos', query, 'post');
  }
}