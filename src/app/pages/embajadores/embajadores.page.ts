import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { STORAGES } from 'src/app/interfas/sotarage';
import { ToolsService } from 'src/app/services/tools.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import * as _ from 'lodash';
import { CobrosService } from 'src/app/service-component/cobros.service';

@Component({
  selector: 'app-embajadores',
  templateUrl: './embajadores.page.html',
  styleUrls: ['./embajadores.page.scss'],
})
export class EmbajadoresPage implements OnInit {
  selecciono:boolean = false;
  listEmbajadores:any = [];
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
    private _cobros: CobrosService,
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
    this.listEmbajadores = [];
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
    this._cobros.get(this.query).subscribe((res:any)=>{
      this.listEmbajadores.push(...res.data );
      this.listEmbajadores =_.unionBy(this.listEmbajadores || [], res.data, 'id');
      
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

}
