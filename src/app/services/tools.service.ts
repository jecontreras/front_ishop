import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  
  loading:any;
  currency:any = { prefix: '$ ',align: 'left', thousands: '.', decimal: ',', precision: 0 };
  
  constructor(
    public toastCtrl: ToastController,
    public loadingCrl: LoadingController,
    public alertController: AlertController,
  ) { }
  
  codigo(){
    return (Date.now().toString(20).substr(2, 3) + Math.random().toString(20).substr(2, 3)).toUpperCase();
  }
  
  async presentToast(mensaje:string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
  
  async presentLoading(mensaje:string = "") {
    this.loading = await this.loadingCrl.create({
      message: mensaje || 'Cargando ...',
      duration: 5000,
      translucent: true,
      backdropDismiss: true
    });
    await this.loading.present();
  }
  async dismisPresent(){
    if(this.loading) await this.loading.onDidDismiss();
  }

  async presentAlertConfirm( mensaje:any ) {
    return new Promise( async ( resolve )=>{
      const alert = await this.alertController.create({
        header: mensaje.header,
        message: mensaje.mensaje || '',
        cssClass: mensaje.cssClass || 'my-custom-class',
        keyboardClose: false,
        backdropDismiss: false,
        animated: true,
        buttons: [
          {
            text: mensaje.confirm || 'Confirmar',
            cssClass: 'primaryBTN',
            handler: () => {
              resolve(true)
              return true;
            }
          },{
            text: mensaje.cancel || 'Cancel',
            role: 'cancel',
            cssClass: 'secondaryBTN',
            handler: (blah) => {
              resolve(false);
              return false;
            }
          }
        ]
      });
  
      await alert.present();
    });
  }

  monedaChange( cif = 3, dec = 2, valor:any ){
    // tomamos el valor que tiene el input
    //  console.log(valor, cif, dec)
     if( !valor ) return 0;
    let inputNum = valor;
    // Lo convertimos en texto
    inputNum = inputNum.toString()
    // separamos en un array los valores antes y después del punto
    inputNum = inputNum.split('.')
    // evaluamos si existen decimales
    if (!inputNum[1]) {
        inputNum[1] = '00'
    }

    let separados
    // se calcula la longitud de la cadena
    if (inputNum[0].length > cif) {
        let uno = inputNum[0].length % cif
        if (uno === 0) {
            separados = []
        } else {
            separados = [inputNum[0].substring(0, uno)]
        }
        let numero:number = Number(inputNum[0].length);
        let posiciones = Number(numero / cif)
        for (let i = 0; i < posiciones; i++) {
            let pos = ((i * cif) + uno)
            // console.log(uno, pos)
            if(inputNum[0] == "") continue;
            separados.push(inputNum[0].substring(pos, (pos + 3)))
        }
    } else {
        separados = [inputNum[0]]
    }
    separados = separados.filter( (row:any)=> row != "");
    return '$' + separados.join(".") + ''; //+ ',' + inputNum[1];
  }

  async cantidadSelect( item:any ){
    return new Promise( async( resolve ) =>{
      const alert = await this.alertController.create({
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

}
