import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';
import { SUBCATEGORIA } from 'src/app/interfas/sotarage';
@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  constructor(
    private _model: ServiciosService
  ) { }
  get(query: any){
    return this._model.querys<SUBCATEGORIA>('subcategoria/querys', query, 'post');
  }
  saved (query: any){
    return this._model.querys<SUBCATEGORIA>('subcategoria', query, 'post');
  }
}
