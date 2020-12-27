import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { STORAGES } from 'src/app/interfas/sotarage';
import { NameappAction } from 'src/app/redux/app.actions';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-ayudas',
  templateUrl: './ayudas.page.html',
  styleUrls: ['./ayudas.page.scss'],
})
export class AyudasPage implements OnInit {

  sliderOpts = {
    allowSlidePrev: true,
    allowSlideNext: true
  };

  constructor(
    private _store: Store<STORAGES>,
    private Router: Router,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
  }

  Vervideo1(){
    const browser = this.iab.create("https://www.youtube.com/embed/ALZHF5UqnU4", '_system');
  }

  Vervideo2(){
    const browser = this.iab.create("https://www.youtube.com/embed/ALZHF5UqnU4", '_system');
  }

  Vervideo3(){
    const browser = this.iab.create("https://www.youtube.com/embed/ALZHF5UqnU4", '_system');
  }

  nexPaso(){
    let accion = new NameappAction( { iniciado: true } , 'post');
    this._store.dispatch( accion );
    this.Router.navigate(['/portada']);
  }

}
