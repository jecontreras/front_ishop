import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-formordenes',
  templateUrl: './formordenes.page.html',
  styleUrls: ['./formordenes.page.scss'],
})
export class FormordenesPage implements OnInit {

  titulo:string = 'Create';

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  close(){
    this.modalCtrl.dismiss();
  }

  agregar(){
    
  }

}
