import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { NOTIFICACIONES } from 'src/app/interfas/sotarage';
import { CarritoAction } from 'src/app/redux/app.actions';
import { OrdenesService } from 'src/app/service-component/ordenes.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import { BuscadorComponent } from 'src/app/components/buscador/buscador.component';
import { OrdenesAction } from 'src/app/redux/app.actions';

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
  evento:any = {};

  constructor(
    private modalCtrl: ModalController,
    private _store: Store<NOTIFICACIONES>,
    private _orden: OrdenesService,
    public _tools: ToolsService,
    private navparams: NavParams
  ) {

    this._store.subscribe((store:any)=>{
      store = store.name;
      this.data.articulo = store.carrito;
      this.dataUser = store.persona || {};
      this.suma();
    });

   }

  ngOnInit() {
    this.evento = this.navparams.get('obj');
    if(this.evento){
      this.data = {
        cliente: {
          emailCliente: this.evento.emailCliente,
          cedulaCliente: this.evento.cedulaCliente,
          numeroCliente: this.evento.numeroCliente,
          ciudadCliente: this.evento.ciudadCliente,
          nombreCliente: this.evento.idCliente.nombre,
          emailVendedor: this.evento.emailVendedor,
          cedulaVendedor: this.evento.cedulaVendedor,
          celularCliente: this.evento.idCliente.cedula,
          direccionCliente: this.evento.direccionCliente
        },
        factura: {
          fecha_pedido: this.evento.fecha_pedido,
          id: this.evento.id,
          comision: this.evento.comision,
          precio: this.evento.precio,
          codigo: this.evento.codigo
        },
        total: this.evento.precio,
        ganancias: this.evento.comision,
        estado: this.evento.estado,
        id: this.evento.id,
        idRemesa: this.evento.idRemesa,
        estadoName: this.evento.estadoName,
        empresaTrans: this.evento.empresaTrans,
        articulo: []
      };
      this.titulo = "Actualizar";
      this.getArticulo();
    }
  }

  getArticulo(){
    this._tools.presentLoading();
    this._orden.getArticulo({ where:{ factura: this.evento.id } }).subscribe((res:any)=>{
      this.data.articulo = _.map(res.data, row=>{
        return {
          files: [ row.producto.foto || './assets/product.jpg'],
          titulo: row.producto.titulo,
          cantidadAduiridad: row.cantidad,
          precioVenta: row.precio
        };
      });
      this._tools.dismisPresent();
    },(error)=>this._tools.presentToast("Error de servidor") );
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
      let contando:number = ( row.precioOferta || row.precioVenta || 0 ) * Number( row.cantidadAduiridad ) || 1;
      suma+= contando;
      ganancias+= ( contando * row.comision || 10 ) / 100;
    }
    this.data.total = suma;
    this.data.ganancias = ganancias;
  }

  agregar(){
    if(!this.dataUser.id) return false;
    if( !this.data.cliente.cedulaCliente || !this.data.cliente.celularCliente || !this.data.cliente.ciudadCliente || !this.data.cliente.direccionCliente) return this._tools.presentToast("Error llenar los campos requeridos");
    if(Object.keys(this.data.articulo).length == 0 ) return this._tools.presentToast("Error no ay articulos agregados");
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
        emailVendedor: this.dataUser.email,
        ciudadCliente: this.data.cliente.ciudadCliente,
        direccionCliente: this.data.cliente.direccionCliente
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
      let accion = new OrdenesAction( res.data, 'post');
      this._store.dispatch(accion);
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
