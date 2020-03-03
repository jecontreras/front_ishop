import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';
import { REGALOS } from '../interfas/sotarage';

@Injectable({
  providedIn: 'root'
})
export class RegalosService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query: any){
    return this._model.querys<REGALOS>('regalos/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<REGALOS>('regalos', query, 'post');
  }
}
