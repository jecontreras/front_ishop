import { Injectable } from '@angular/core';
import { ServiciosService } from './servicios.service';
import { LOGINUSER } from './../interfas/interfaces';
import { PERSONA } from '../interfas/sotarage';
@Injectable({
  providedIn: 'root'
})
export class UserService { 
  private url: string;
  private handleError: any;
  constructor(
    private _model: ServiciosService
  ) {
 }
  get(user: any){
    return this._model.querys<LOGINUSER>('personas/querys', user, 'post');
  }
  login(user: Object) {
    return this._model.querys<LOGINUSER>('personas/login', user, 'post');
  }
  register(user: Object) {
    return this._model.querys<PERSONA>('personas/register', user, 'post');
  }
  update(query:any = {}){
    return this._model.querys<PERSONA>('personas'+query.id ,query, 'put');
  }

}

