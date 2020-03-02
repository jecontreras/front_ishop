import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';
import { PRODUCTOS } from 'src/app/interfas/sotarage';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private _model: ServiciosService
  ) {
    // this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.querys<PRODUCTOS>('productos/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<PRODUCTOS>('productos', query, 'post');
  }
}
