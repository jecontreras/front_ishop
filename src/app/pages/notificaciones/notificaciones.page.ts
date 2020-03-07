import { Component, OnInit } from '@angular/core';
import { NOTIFICACIONES } from 'src/app/interfas/sotarage';
import { Store } from '@ngrx/store';
import { NotificacionesService } from 'src/app/service-component/notificaciones.service';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  public list_notificacion:any = [];
  public ev:any = {};
  public disable_list:boolean = true;
  public data_user:any = {};
  public query:any = {
    where:{
      reseptor: this.data_user.id
    },
    skip: 0
  };
  public evScroll:any = {};

  constructor(
    private _store: Store<NOTIFICACIONES>,
    private _notificaion: NotificacionesService,
    private _tools: ToolsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.get_notificacion();
  }
  
  doRefresh(ev){
    this.ev = ev;
    this.disable_list = false;
    this.get_notificacion();
  }

  loadData(ev){
    //console.log(ev);
    this.evScroll = ev;
    this.query.skip++;
    this.get_notificacion();
  }

  async get_notificacion(){
    return this._notificaion.get(this.query)
    .subscribe((rta:any)=>{
      // console.log(rta);
      this.list_notificacion.push(...rta.data );
      if( this.evScroll.target ){
        this.evScroll.target.complete()
      }
    }, (err)=>{ console.error(err); this._tools.presentToast("Error de servidor o conexion"); });
  }
  view(item:any){
    if(item.tipo === 'chat'){
      let data:any = {
        id: item.articulo.id,
        titulo: item.articulo.titulo,
        foto: item.articulo.foto,
        costopromosion: item.articulo.costopromosion,
        costoventa: item.articulo.costoventa
      };
      /*let accion = new ArticuloSelectAction(data, 'post')
      this._store.dispatch(accion)
      this.router.navigate(['/chat_view', item.reseptor]);*/
    }
  }

}
