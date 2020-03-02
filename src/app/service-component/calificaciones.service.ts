import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';
import { CALIFICACIONES } from '../interfas/sotarage';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {

  constructor(
    private _model: ServiciosService
  ) { }
  get(query: any){
    return this._model.querys<CALIFICACIONES>('calificaciones/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<CALIFICACIONES>('calificaciones', query, 'post');
  }
}
