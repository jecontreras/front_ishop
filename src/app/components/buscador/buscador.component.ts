import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ProductosService } from 'src/app/service-component/productos.service';
import { STORAGES } from 'src/app/interfas/sotarage';
import { Store } from '@ngrx/store';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { CategoriaService } from 'src/app/service-component/categoria.service';
import { Router } from '@angular/router';
import { CarritoAction } from 'src/app/redux/app.actions';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {
  evento:any;
  constructor(
    private modalCtrl: ModalController,
    private _productos: ProductosService,
    private _tools: ToolsService,
    private _store: Store<STORAGES>,
    private navparams: NavParams,
    private _categoria: CategoriaService,
    private _router: Router
  ) { }

  textoBuscar = "";
  query:any = {
    where:{
      estado: 0
    },
    skip: 0
  };
  listProductos:any = [];
  evScroll:any = {};
  ev:any = {};
  disable_list:boolean = true;
  listCategorias:any = [];

  ngOnInit() {
    this.evento = this.navparams.get('obj');
    this.getProductos();
    this.getCategoria();
  }
  loadData(ev){
      //console.log(ev);
      this.evScroll = ev;
      this.query.skip++;
      this.getProductos();
  }

  getProductos(){
    this._tools.presentLoading();
    this._productos.get(this.query).subscribe((res:any)=>{
      this.listProductos = _.unionBy(this.listProductos || [], res.data, 'id');

      if( this.evScroll.target ){
        this.evScroll.target.complete()
      }

      this._tools.dismisPresent();
    },(error)=>{ 
      console.error(error); this._tools.presentToast("Error de servidor");this._tools.dismisPresent();if( this.evScroll.target ){ this.evScroll.target.complete() }
    });
  }
  viewProducto(off:any){
    if(this.evento === true){
      off.cantidadAduiridad = 1;
      let accion = new CarritoAction(off, 'post');
      this._store.dispatch(accion);
      this._tools.presentToast("Agregado al Carro");
    }else{
      this._router.navigate([ '/tabs/productoView', off.id ])
      this.salir();
    }
  }

  salir(){
    this.modalCtrl.dismiss();
  }

  getCategoria(){
    this._categoria.get({ where: { estado: 0 }, limit: 1000 }).subscribe((res:any)=>{
      this.listCategorias = res.data;
      if(!res.data[0]) this.listCategorias = [{id: 1, nombre:"Trajes de Baño"},{id: 2, nombre:"Zapatos"},{id: 3, nombre:"Camisas"}];
    },(error)=>this._tools.presentToast("Error de servidor"));
  }
  
  cambioCategoria(ev:any){
    let data:any = ev.detail.value;
    this.query.where.idSubCategoria = data.idSubcategoria;
    this.listProductos = [];
    this.getProductos();
  }

  buscar(ev){
    this.textoBuscar = ev.detail.value;
    this.listProductos = [];
    this.query.skip = 0;
    if(this.textoBuscar.length >= 1){
      this.query.where.or = [
        // {
        //   titulo:{
        //     contains: this.textoBuscar || ''
        //   }
        // },
        {
          slug:{
            contains: _.kebabCase(this.textoBuscar) || ''
          }
        }
      ];
    }else{
      delete this.query.where.or;
    }

    this.getProductos();
  }
}
