import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Genre } from 'src/app/interfas/interfaces';
import { ModalController } from '@ionic/angular';
import { BuscadorComponent } from '../buscador/buscador.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  @Input() config:any = {};
  @Output() selectCategorias = new EventEmitter();

  textoBuscar:string = '';
  listCategoria: Genre[]=[];
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log(this.config)
    this.listCategoria = this.config.categoria;
  }
  
  buscar(ev:any ){

  }
  selectCategoria(ev:any){
    let data = ev.detail.value.name;
    console.log(data);
    this.selectCategorias.emit(data);
  }

  async openEndSearch(){
    const modal = await this.modalCtrl.create({
      component: BuscadorComponent,
      componentProps: {},
    });
    modal.present();
  }
}
