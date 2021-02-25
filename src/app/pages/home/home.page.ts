import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { STORAGES } from 'src/app/interfas/sotarage';
import { DataService } from 'src/app/services/data.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  dataUser:any = {};
  data:any = {};
  textoBuscar:string;
  listArticulos:any = [];
  listSeleccionado:any = [];
  vista:boolean = true;

  constructor( 
    private _store: Store<STORAGES>,
    public _tools: ToolsService,
    private _data: DataService
  ) {
    this._store.subscribe((store:any)=>{
      store = store.name;
      if( !store ) return false;
      // this.listRow = store.ordenes || [];
      this.dataUser = store.persona || {};
    });
  }

  ngOnInit() {
    this.listArticulos = this._data.lista;
  }
  

  buscarProducto( ev:any ){
    this.textoBuscar = ev.detail.value;
    //console.log("***2", this.textoBuscar);
    if( this.textoBuscar == "") this.listArticulos = this._data.lista;
    else this.listArticulos = this.findMatches( this.textoBuscar);
  }

  findMatches( wordToSearch:string ) {
    return this.listArticulos.filter(rorw => {
        const regex = new RegExp(wordToSearch, 'gi');
        return rorw.titulo.match(regex)
    })
}

  async seleccionando( data:any ){
    if( !data.check ){
      data.cantidad = ( await this._tools.cantidadSelect( data ) );
      console.log( data );
      if( !data.cantidad ) return false;
      data.valor = Number( data.valor );
      data.total = Number( data.valor ) * Number( data.cantidad );
      this.listSeleccionado.push( data );
      data.check = !data.check;
    }else{
      this.listSeleccionado = this.listSeleccionado.filter( ( item:any )=> item.id !== data.id );
      data.check = !data.check;
    }
    this.suma();
  }

  suma(){
    this.data.total = _.sumBy( this.listSeleccionado, 'total');
  }

  verTiket(){
    this.suma();
    this.vista = false;
  }

  creandoTiket(){
    this.suma();
    this.vista = true;
  }

  async finalizarTiket(){
    let alert:any = await this._tools.presentAlertConfirm( { mensaje: "Deseas Finalizar Ticket"} );
    if( !alert ) return false;

  }

}
