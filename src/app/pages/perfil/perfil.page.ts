import { Component, OnInit } from '@angular/core';
import { STORAGES } from 'src/app/interfas/sotarage';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  dataUser: any = {};
  constructor(
    private _store: Store<STORAGES>
  ) { 
    this._store.subscribe((store:any)=>{
      console.log(store);
      store = store.name;
      this.dataUser = store.persona;
    });
  }

  ngOnInit() {
  }

}
