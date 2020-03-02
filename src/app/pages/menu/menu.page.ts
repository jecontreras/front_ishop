import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { STORAGES } from 'src/app/interfas/sotarage';
import { Store } from '@ngrx/store';
import { MenusAction } from 'src/app/redux/app.actions';
import * as _ from 'lodash';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public data:any={};
  dataMenu:any = {
    menu1: [],
    menu2: [],
    menu3: []
  };
  public ev:any = {};
  public disable_list:boolean = true;

  constructor(
    private dataService: DataService,
    private _store: Store<STORAGES>
  ) {
    this._store.subscribe((store:any)=>{
      store = store.name;
      this.dataMenu = store.menus;
    });
   }

  ngOnInit() {
    if(Object.keys(this.dataMenu).length == 0) {
      this.getMenus();
    }
  }
  getMenus(){
    this.dataService.getMenuOpts().subscribe(rta=>{
      this.dataMenu=rta.data; console.log(rta); this.PushStoreMenus(this.dataMenu) 
      if(this.ev){
        this.disable_list = true;
        if(this.ev.target){
          this.ev.target.complete();
        }
      }
    },(error)=>{
      console.error(error);
      if(this.ev){
        this.disable_list = true;
        if(this.ev.target){
          this.ev.target.complete();
        }
      }
    });
  }
  doRefresh(ev){
    this.ev = ev;
    this.disable_list = false;
    this.getMenus();
  }
  PushStoreMenus(menus){
    for(let row of menus){
      let idx = this.dataMenu.find(item => item.id == row.id);
      if(!idx){
        let accion = new MenusAction(row, 'post');
        this._store.dispatch(accion);
      }
    }
  }

}
