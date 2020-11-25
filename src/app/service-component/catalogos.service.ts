import { Injectable } from '@angular/core';
import { CATALAGODETALLE, CATALOGOS } from '../interfas/sotarage';
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
    return this._model.querys<CATALOGOS>('catalago/querys', query, 'post');
  }
  getDetalle(query: any){
    return this._model.querys<CATALAGODETALLE>('catalagodetalle/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<CATALOGOS>('catalago', query, 'post');
  }
}