import { Injectable } from '@angular/core';
import { ServiciosService } from './servicios.service';
import { LOGINUSER } from './../interfas/interfaces';
import { USER } from '../interfas/sotarage';
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
  login(user: Object) {
    return this._model.querys<LOGINUSER>('user/login', user, 'post');
  }
  register(user: Object) {
    return this._model.querys<USER>('user/register', user, 'post');
  }
  update(query:any = {}){
    return this._model.querys<USER>('user'+query.id ,query, 'put');
  }

}

