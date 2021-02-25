import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay } from 'rxjs/operators';
import { Componente } from '../interfas/interfaces';
import { ServiciosService } from './servicios.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  lista: any = [];
  constructor( 
    private http: HttpClient,
    private _servicio: ServiciosService
  ) { 
    this.getLlenado();
  }

  getLlenado(){
    this.lista = [
      {
        id: 1,
        titulo: "Pizza Mexicana",
        foto: "",
        estado: true,
        valor: 3500
      },
      {
        id: 2,
        titulo: "Pizza Ranchera",
        foto: "",
        estado: true,
        valor: 3500
      },
      {
        id: 3,
        titulo: "Pizza Champiñon",
        foto: "",
        estado: true,
        valor: 3500
      },
      {
        id: 4,
        titulo: "Pizza Haywama",
        foto: "",
        estado: true,
        valor: 3500
      },
    ];
  }

  getMenuOpts() {
    // return this.http.get<Componente[]>('/assets/data/menu.json');
    return this._servicio.querys<Component[]>('menu/querys',{},'post');
  }

  getHeroes() {
    return this.http.get('/assets/data/superheroes.json')
        .pipe(
          delay(2000)
        );
  }


}
