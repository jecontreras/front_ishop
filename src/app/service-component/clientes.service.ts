import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';
import { CLIENTE } from '../interfas/sotarage';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private _model: ServiciosService
  ) { }
  get(query: any){
    return this._model.querys<CLIENTE>('clientes/querys', query, 'post');
  }
}
