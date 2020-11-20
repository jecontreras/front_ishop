import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { STORAGES } from 'src/app/interfas/sotarage';
import { ArchivoService } from 'src/app/service-component/archivo.services';
import { ProductosService } from 'src/app/service-component/productos.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.page.html',
  styleUrls: ['./catalogos.page.scss'],
})
export class CatalogosPage implements OnInit {
  
  listCatalogos:any = [];
  query:any = {
    where:{
      estado: 0
    },
    skip: 0
  };
  public evScroll:any = {};
  public ev:any = {};
  public disable_list:boolean = true;

  constructor(
    private _archivos: ArchivoService,
    private _productos: ProductosService,
    public _tools: ToolsService,
    private _store: Store<STORAGES>,
  ) { 
    this._store.subscribe((store:any)=>{
      console.log(store);
      store = store.name;
    });
  }

  ngOnInit() {
    this.getProductos();
  }

  doRefresh(ev){
    this.ev = ev;
    this.disable_list = false;
    this.listCatalogos = [];
    this.query.skip = 0;
    this.getProductos();
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
      this.listCatalogos.push(...res.data );
      this.listCatalogos =_.unionBy(this.listCatalogos || [], res.data, 'id');
      
      if( this.evScroll.target ){
        this.evScroll.target.complete()
      }
      if(this.ev){
        this.disable_list = true;
        if(this.ev.target){
          this.ev.target.complete();
        }
      }
      this._tools.dismisPresent();

    },(error)=>{console.error(error); this._tools.presentToast("Error de servidor")})
  }

  async compartir( off ){
    let result:boolean = await this._archivos.compartir( { title: off.titulo, subtitle:'',foto: off.foto, url:'' } );
  }

}
