import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { NOTIFICACIONES } from 'src/app/interfas/sotarage';
import { CarritoAction } from 'src/app/redux/app.actions';
import { OrdenesService } from 'src/app/service-component/ordenes.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as moment from 'moment';
import { BuscadorComponent } from 'src/app/components/buscador/buscador.component';

@Component({
  selector: 'app-formordenes',
  templateUrl: './formordenes.page.html',
  styleUrls: ['./formordenes.page.scss'],
})
export class FormordenesPage implements OnInit {

  titulo:string = 'Create';
  data:any = {
    cliente: {},
    factura: {
      fecha_pedido: moment().format('YYYY-MM-DD')
    },
    articulo: []
  };
  dataUser:any = {};
  btnDisabled:boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private _store: Store<NOTIFICACIONES>,
    private _orden: OrdenesService,
    private _tools: ToolsService
  ) {

    this._store.subscribe((store:any)=>{
      store = store.name;
      this.data.articulo = store.carrito;
      this.dataUser = store.persona || {};
      this.suma();
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

  suma(){
    let suma =  0;
    let ganancias = 0;
    for(let row of this.data.articulo){
      suma+= ( row.precioOferta || row.precioVenta || 0 ) * row.cantidadAduiridad || 1;
    }
    ganancias = ( suma * 11 ) / 100;
    this.data.total = suma;
    this.data.ganancias = ganancias;
  }

  agregar(){
    if(!this.dataUser.id) return false;
    this.suma();
    this.btnDisabled = true;
    let data:any = {
      factura: {
        idVendedor: this.dataUser.id,
        codigo: this.codigo(),
        precio: this.data.total,
        comision: this.data.ganancias,
        emailCliente: this.data.cliente.emailCliente,
        cedulaCliente: this.data.cliente.cedulaCliente,
        numeroCliente: this.data.cliente.celularCliente,
        nombreCliente: this.data.cliente.nombreCliente,
        fecha_pedido: this.data.factura.fecha_pedido,
        cedulaVendedor: this.dataUser.cedula,
        emailVendedor: this.dataUser.email
      },
      cliente: {
        nombreCliente: this.data.cliente.nombreCliente,
        cedulaCliente: this.data.cliente.cedulaCliente,
        celularCliente: this.data.cliente.celularCliente,
        emailCliente: this.data.cliente.emailCliente
      },
      articulo: this.data.articulo
    };
    this._orden.saved( data ).subscribe((res:any)=>{
      console.log(res);
      this._tools.presentToast("Orden creado exitoso");
      this.data.id = res.id;
      this.data = {
        cliente: {},
        factura: {
          fecha_pedido: moment().format('YYYY-MM-DD')
        },
        articulo: []
      };
      this.btnDisabled = false;
      this.close();
    },(error)=> console.error(error));
    
  }

  openCarro(){
    this.modalCtrl.create({
      component: BuscadorComponent,
      componentProps: {
        obj: true
      }
    }).then(modal=>modal.present());
  }

  codigo(){
    return (Date.now().toString(20).substr(2, 3) + Math.random().toString(20).substr(2, 3)).toUpperCase();
  }


}
