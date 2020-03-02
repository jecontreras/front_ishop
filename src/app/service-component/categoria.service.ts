import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';
import { CATEGORIA } from 'src/app/interfas/sotarage';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private _model: ServiciosService
  ) {
    // this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.querys<CATEGORIA>('categoria/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<CATEGORIA>('categoria', query, 'post');
  }
}
