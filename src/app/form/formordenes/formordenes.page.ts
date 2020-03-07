import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { NOTIFICACIONES } from 'src/app/interfas/sotarage';
import { CarritoAction } from 'src/app/redux/app.actions';

@Component({
  selector: 'app-formordenes',
  templateUrl: './formordenes.page.html',
  styleUrls: ['./formordenes.page.scss'],
})
export class FormordenesPage implements OnInit {

  titulo:string = 'Create';
  data:any = {
    cliente: {},
    articulo: []
  };

  constructor(
    private modalCtrl: ModalController,
    private _store: Store<NOTIFICACIONES>,
  ) {

    this._store.subscribe((store:any)=>{
      store = store.name;
      this.data.articulo = store.carrito;
    });

   }

  ngOnInit() {
  }

  deleteCart( idx:any, item:any ){
    this.data.articulo.splice(idx, 1)
    let accion = new CarritoAction(item, 'delete');
    this._store.dispatch( accion );
  }

  close(){
    this.modalCtrl.dismiss();
  }

  agregar(){
    
  }

}
