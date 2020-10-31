import { Injectable } from '@angular/core';
import { RESUMENPERSONA } from '../interfas/sotarage';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class ResumenPersonaService {

  constructor(
    private _model: ServiciosService
  ) {
    // this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.querys<RESUMENPERSONA>('resumenpersona/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<RESUMENPERSONA>('resumenpersona', query, 'post');
  }
}
