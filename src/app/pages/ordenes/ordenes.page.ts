import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/service-component/ordenes.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ModalController } from '@ionic/angular';
import { FormordenesPage } from 'src/app/form/formordenes/formordenes.page';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.page.html',
  styleUrls: ['./ordenes.page.scss'],
})
export class OrdenesPage implements OnInit {
  query:any = {};
  listOrdenes:any = [];

  constructor(
    private _ordenes: OrdenesService,
    private _tools: ToolsService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.getOrdenes();
  }

  getOrdenes(){
    this._ordenes.get(this.query).subscribe((res:any)=>{
      this.listOrdenes = res.data;
    },error=>{ console.error(error); this._tools.presentToast("Error de servidor")});
  }

  agregar( obj:any ){
   this.modalCtrl.create({
      component: FormordenesPage,
      componentProps: {
        obj: obj
      }
    }).then(modal=>modal.present()); 
  }

}
