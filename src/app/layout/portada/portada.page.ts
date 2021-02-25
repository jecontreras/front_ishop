import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as _ from 'lodash';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.page.html',
  styleUrls: ['./portada.page.scss'],
})
export class PortadaPage implements OnInit {
  
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  dataCosto:any = [
    { valor: 700, title: "Agua Bolsa", color: "primary" },
    { valor: 2000, title: "Jugo Hit 350ml || Gaceosa 350ml", color: "secondary" },
    { valor: 3000, title: "Cerve Agui Lata || Ligth || Mr Tea", color: "success" },
    { valor: 3500, title: "X Por || Vegetariana || Champiñon || Carnes || Hawaina || Bocadillo || Mexicana || Ranchera || Jamon || Jamon pollo || Heineken || Club colombia lata", color: "danger" },
    { valor: 4000, title: "Hit Litro || Gaceosa Plastica 1.5", color: "warning" },
    { valor: 4500, title: "Mr Tea 1.5ml", color: "primary" },
    { valor: 4700, title: "X Por || Tocineta || Margarita || Tipica || Tropical || Peperoni || De Carnes", color: "dark" },
    { valor: 5000, title: "Gaceosa Coca Cola 1.5ml", color: "medium" },
    { valor: 5500, title: "Gaceosa 2.5 lt", color: "primary" },
    { valor: 6000, title: "X Camarones", color: "tertiary" },
    { valor: 12000, title: "Pizzeta || Jamon Pollo || Jamon || Hawaiana || Carnes Frias || Champiñones", color: "warning" },
    { valor: 14000, title: "Pizzeta || Ranchera || Mexicana || Bocadillo || Vegetariana || Tocineta || Margarita || Tipica", color: "primary" },
    { valor: 16000, title: "lasaña || Pizzeta || Tropical || Peperoni || De Carnes || ", color: "success" },
    { valor: 17000, title: "Pizzeta || Camaron ", color: "primary" },
    { valor: 27000, title: "Mediana || Vegetariana || Champiñon || Carnes || Hawaina || Bocadillo || Mexicana || Ranchera || Jamon || Jamon pollo", color: "primary" },
    { valor: 30000, title: "Mediana || Tocineta || Margarita || Tipica || Tropical", color: "success" },
    { valor: 32000, title: "Mediana || Peperoni || De Carnes", color: "success" },
    { valor: 35000, title: "Completa || Vegetariana || Champiñon || Carnes || Hawaina || Bocadillo || Mexicana || Ranchera || Jamon || Jamon pollo ", color: "primary" },
    { valor: 37000, title: "Mediana || Camaron", color: "dark" },
    { valor: 47000, title: "Grande || Tocineta || Margarita || Tipica || Tropical || Peperoni || De Carnes", color: "success" },
    { valor: 60000, title: "Grande || Camaron", color: "warning" },
  ];
  seleccionados:any = [];
  opciones:any;
  data:any = {
    total: 0,
    vueltos: 0
  };

  ocultarDs:boolean = true;

  constructor( 
    private _tools: ToolsService,
    public alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
    this.dataCosto = _.orderBy( this.dataCosto, [ 'valor' ], [ 'ASC' ] );
    this.opciones = this._tools.currency
  }

  eventoOcultar(){
    this.ocultarDs = !this.ocultarDs;
  }

  async openSelect( item:any ){
    let cantidad:any = await this.cantidadSelect( item );
    if( !cantidad ) return false;
    console.log( cantidad );
    this.seleccionados.push( {
      codigo: this._tools.codigo(),
      cantidad: Number( cantidad ),
      valor: Number( item.valor ),
      total: Number( item.valor ) * Number( cantidad )
    } );
    this.suma();
  }

  async cantidadSelect( item:any ){
    return new Promise( async( resolve ) =>{
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Cantidad ' + item.valor,
        keyboardClose: false,
        backdropDismiss: false,
        animated: true,
        inputs: [
          {
            name: 'valor',
            type: 'number',
            // value: "1",
            placeholder: 'Cantidad asignar...'
          }
        ],
        
        buttons: [
          {
            text: 'CONFIRMAR',
            cssClass: 'primaryBTN',
            handler: ( ev:any ) => {
              console.log('Confirm Ok', ev);
              resolve( Number( ev.valor || 1 ) );
            }
          },
          {
            text: 'CANCELAR',
            role: 'cancel',
            cssClass: 'secondaryBTN',
            handler: () => {
              resolve( false );
              // console.log('Confirm Cancel');
            }
          }, 
        ]
      });
  
      await alert.present();
      const firstInput: any = document.querySelector('ion-alert input');
	    firstInput.focus();
    });
  }

  suma(){
    this.data.total = _.sumBy( this.seleccionados, 'total');
  }

  async eliminar( item:any ){
    let alert = await this._tools.presentAlertConfirm( { header: "Deseas eliminar" } );
    if( !alert ) return false;
    this.seleccionados = this.seleccionados.filter( ( row:any )=> row.codigo != item.codigo );
    this.suma();
  }

  async finalizar(){
    let vueltos:any = await this.finalizarAlert();
    this.data.vueltos = Number( vueltos || this.data.total ) - Number( this.data.total );
  }

  finalizarAlert(){
    return new Promise( async( resolve ) =>{
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Plata recibida',
        keyboardClose: false,
        backdropDismiss: false,
        animated: true,
        inputs: [
          {
            name: 'valor',
            type: 'number',
            value: this.data.total,
            placeholder: '...'
          }
        ],
        
        buttons: [
          {
            text: 'CONFIRMAR',
            cssClass: 'primaryBTN',
            handler: ( ev:any ) => {
              console.log('Confirm Ok', ev);
              resolve( Number( ev.valor ) );
            }
          },
          {
            text: 'CANCELAR',
            role: 'cancel',
            cssClass: 'secondaryBTN',
            handler: () => {
              resolve( this.data.total );
              // console.log('Confirm Cancel');
            }
          }, 
        ]
      });
  
      await alert.present();
      const firstInput: any = document.querySelector('ion-alert input');
	    firstInput.focus();
    });
  }

  limpiar(){
    this.seleccionados = [];
    this.data = {
      total: 0,
      vueltos: 0
    };
  }

  
  
}
