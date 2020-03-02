import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';
import { NOTIFICACIONES } from 'src/app/interfas/sotarage';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(
    private _model: ServiciosService
  ) { }
  get(query: any){
    return this._model.querys<NOTIFICACIONES>('notificaciones/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<NOTIFICACIONES>('notificaciones', query, 'post');
  }
}
