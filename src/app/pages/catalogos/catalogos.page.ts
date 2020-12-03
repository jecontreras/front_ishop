import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { STORAGES } from 'src/app/interfas/sotarage';
import { ArchivoService } from 'src/app/service-component/archivo.services';
import { ProductosService } from 'src/app/service-component/productos.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { CatalogosService } from 'src/app/service-component/catalogos.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.page.html',
  styleUrls: ['./catalogos.page.scss'],
})
export class CatalogosPage implements OnInit {
  selecciono:boolean = false;
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
    private _catalago: CatalogosService,
    public _tools: ToolsService,
    private _store: Store<STORAGES>,
    private iab: InAppBrowser,
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
    this._catalago.get(this.query).subscribe((res:any)=>{
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

  openCatalago( off ){
    const browser = this.iab.create(off.url, '_system');
  }

}
