import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyudasPageRoutingModule } from './ayudas-routing.module';

import { AyudasPage } from './ayudas.page';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyudasPageRoutingModule
  ],
  providers:[
    VideoPlayer
  ],
  declarations: [AyudasPage]
})
export class AyudasPageModule {}
