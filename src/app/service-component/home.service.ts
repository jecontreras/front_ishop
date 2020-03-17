import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';
import { NAMEAPP } from 'src/app/interfas/sotarage';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private _model: ServiciosService
  ) { }
  get(query: any){
    return this._model.querys<NAMEAPP>('plantillas/inicial', query, 'post');
  }
}
