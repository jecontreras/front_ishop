import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { Store } from '@ngrx/store';
import { STORAGES } from 'src/app/interfas/sotarage';
import { NameappAction } from 'src/app/redux/app.actions';

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
    private videoPlayer: VideoPlayer,
    private _store: Store<STORAGES>,
    private Router: Router
  ) { }

  ngOnInit() {
  }

  Vervideo1(){
    this.videoPlayer.play('https://www.youtube.com/embed/ALZHF5UqnU4').then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }

  Vervideo2(){
    this.videoPlayer.play('https://www.youtube.com/embed/ALZHF5UqnU4').then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }

  Vervideo3(){
    this.videoPlayer.play('https://www.youtube.com/embed/ALZHF5UqnU4').then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }

  nexPaso(){
    let accion = new NameappAction( { iniciado: true } , 'post');
    this._store.dispatch( accion );
    this.Router.navigate(['/portada']);
  }

}
