import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { STORAGES } from 'src/app/interfas/sotarage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  dataUser:any = {};
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };
  data_app:any = [
    {
      titulo:"Nuevos Productos",
      subtitle: "16 Productos desde $16.000",
      descripcion: "Entrega de 5 a 10 dias hábiles",
      productos:[
        {
          id: 1,
          foto: "./assets/product.jpg"
        },
        {
          id: 2,
          foto: "./assets/product.jpg"
        },
        {
          id: 3,
          foto: "./assets/product.jpg"
        },
        {
          id: 4,
          foto: "./assets/product.jpg"
        },
      ]
    }
  ];
  slideOpts = {
    slidesPerView: 2.6,
    freeMode: true
  }; 

  constructor( private _store: Store<STORAGES> ) {
    this._store.subscribe((store:any)=>{
      console.log(store);
      store = store.name;
      this.dataUser = store.persona;
    });
   }

  ngOnInit() {
  }

}
