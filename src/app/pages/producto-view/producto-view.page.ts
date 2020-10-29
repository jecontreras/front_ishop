import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/service-component/productos.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfas/sotarage';
import { Store } from '@ngrx/store';
import { CalificacionesService } from 'src/app/service-component/calificaciones.service';
import { CarritoAction } from 'src/app/redux/app.actions';
import { ModalController } from '@ionic/angular';
import { BuscadorComponent } from 'src/app/components/buscador/buscador.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-producto-view',
  templateUrl: './producto-view.page.html',
  styleUrls: ['./producto-view.page.scss'],
})
export class ProductoViewPage implements OnInit {

  listOpcion:any = [ 'Resumen', 'Calificaciones', 'Relecion'];
  slideOptsTho = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  id:any;
  data:any = {};
  dataComentario:any = {};
  dataVisible:string = 'Resumen';
  dataUser:any = {};
  lisComentario:any = [];
  listProductos:any = [];
  public evScroll:any = {};
  public ev:any = {};
  public disable_list:boolean = true;
  query1:any = {
    where:{ },
    skip: 0
  };
  query2:any = {
    where:{
      estado: 0
    },
    skip: 0
  };
  btndisableComentario:boolean = false;

  constructor(
    private activate: ActivatedRoute,
    private _producto: ProductosService,
    private _tools: ToolsService,
    private _store: Store<STORAGES>,
    private _calificaciones: CalificacionesService,
    private modalCtrl: ModalController
  ) { 
    this._store.subscribe((store:any)=>{
      console.log(store);
      store = store.name;
      this.dataUser = store.persona;
    });
  }

  ngOnInit() {
    this.id = (this.activate.snapshot.paramMap.get('id'));
    this._tools.presentLoading();
    this.getArticulo();
  }
  
  getArticulo(){
    this._producto.get({where:{id: this.id}}).subscribe((res:any)=>{
      this.data = res.data[0];
      if(!this.data.ranking) this.data.ranking = 5;
      this._tools.dismisPresent();
    },(error)=>{ console.error(error);this._tools.presentToast("Error de servidor");this._tools.dismisPresent(); });
  }
  
  getComentario(){
    this.query1.where = { idProducto: this.id };
    this._calificaciones.get(this.query1).subscribe((res:any)=>{
      //console.log(res.data);
      this.lisComentario = _.unionBy(this.lisComentario || [], res.data, 'id');
      if( this.evScroll.target ){ this.evScroll.target.complete() }
    },(error)=>{ console.error(error); this._tools.presentToast("Error de Servidor"); if( this.evScroll.target ){ this.evScroll.target.complete() } });
  }
  
  getArticuloRelacion(){
    this.query2.where = { estado: 0 };
    this._producto.get(this.query2).subscribe((res:any)=>{
      console.log(res.data);
      this.listProductos = _.unionBy(this.listProductos || [], res.data, 'id');
      if( this.evScroll.target ){ this.evScroll.target.complete() }
    },(error)=>{ console.error(error);this._tools.presentToast("Error de servidor");this._tools.dismisPresent(); if( this.evScroll.target ){ this.evScroll.target.complete() } });
  }
  
  cambioVista(ev:any){
    //console.log(ev);
    this.dataVisible = ev.detail.value;
    if(this.dataVisible == 'Calificaciones') this.getComentario();
    if(this.dataVisible == 'Relecion') this.getArticuloRelacion();
  }
  
  submitComentario(){
    //console.log(this.dataComentario);
    this.btndisableComentario = true;
    let data:any = {
      idComentario: {detalle:this.dataComentario.detalle},
      calificacion: this.dataComentario.calificacion,
      idPersona: this.dataUser.id,
      idProducto: this.id,
    };
    this._calificaciones.saved(data).subscribe((res:any)=>{
      console.log(res);
      this.btndisableComentario = false;
      this.lisComentario.push({
        idPersona: { nombre: this.dataUser.nombre },
        idComentario: {detalle:this.dataComentario.detalle},
        calificacion:  this.dataComentario.calificacion
      });
      this._tools.presentToast('Comentario Agregado');
      this.dataComentario = {};
    },(error)=>{ console.error(error); this._tools.presentToast('Error de servidor')});

  }
  
  loadData1(ev){
    this.evScroll = ev;
    this.query1.skip++;
    this.getComentario();
  }

  loadData2(ev){
    this.evScroll = ev;
    this.query2.skip++;
    this.getArticuloRelacion();
  }

  submitCart(){
    this.data.cantidadAduiridad = 1;
    let accion = new CarritoAction(this.data, 'post');
    this._store.dispatch(accion);
    this._tools.presentToast("Agregado al carro");
  }

  openSearch(){
    this.modalCtrl.create({
      component: BuscadorComponent,
      componentProps: {
        obj: {}
      }
    }).then(modal=>modal.present());
  }

}
