import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/service-component/productos.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfas/sotarage';
import { Store } from '@ngrx/store';
import { CalificacionesService } from 'src/app/service-component/calificaciones.service';

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

  constructor(
    private activate: ActivatedRoute,
    private _producto: ProductosService,
    private _tools: ToolsService,
    private _store: Store<STORAGES>,
    private _calificaciones: CalificacionesService
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
    this._calificaciones.get({where:{idProducto: this.id}}).subscribe((res:any)=>{
      //console.log(res.data);
      this.lisComentario = res.data;
    },(error)=>{ console.error(error); this._tools.presentToast("Error de Servidor")});
  }
  getArticuloRelacion(){
    this._producto.get({where:{estado: 0}}).subscribe((res:any)=>{
      console.log(res.data);
      this.listProductos = res.data;
    },(error)=>{ console.error(error);this._tools.presentToast("Error de servidor");this._tools.dismisPresent(); });
  }
  cambioVista(ev:any){
    //console.log(ev);
    this.dataVisible = ev.detail.value;
    if(this.dataVisible == 'Calificaciones') this.getComentario();
    if(this.dataVisible == 'Relecion') this.getArticuloRelacion();
  }
  submitComentario(){
    //console.log(this.dataComentario);
    let data:any = {
      idComentario: {detalle:this.dataComentario.detalle},
      calificacion: this.dataComentario.calificacion,
      idPersona: this.dataUser.id,
      idProducto: this.id,
    };
    this._calificaciones.saved(data).subscribe((res:any)=>{
      console.log(res);
      this.dataComentario = {};
      this._tools.presentToast('Comentario Agregado');
    },(error)=>{ console.error(error); this._tools.presentToast('Error de servidor')});

  }
}
