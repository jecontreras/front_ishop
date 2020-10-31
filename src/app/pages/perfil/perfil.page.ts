import { Component, OnInit } from '@angular/core';
import { STORAGES } from 'src/app/interfas/sotarage';
import { Store } from '@ngrx/store';
import { ResumenPersonaService } from 'src/app/service-component/resumen-persona.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  dataUser: any = {};
  dataResumen:any = {};
  constructor(
    public _tools: ToolsService,
    private _store: Store<STORAGES>,
    private _resumenPersona: ResumenPersonaService
  ) { 
    this._store.subscribe((store:any)=>{
      console.log(store);
      store = store.name;
      this.dataUser = store.persona;
    });
  }

  ngOnInit() {
    this.getResumen();
  }

  getResumen(){
    this._resumenPersona.get( { where: { idPersona: this.dataUser.id }, limit: 1 } ).subscribe(( res:any )=>{
      this.dataResumen = res.data[0] || {};
    });
  }

}
