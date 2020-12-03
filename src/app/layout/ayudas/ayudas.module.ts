import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyudasPageRoutingModule } from './ayudas-routing.module';

import { AyudasPage } from './ayudas.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyudasPageRoutingModule
  ],
  providers:[
    InAppBrowser
  ],
  declarations: [AyudasPage]
})
export class AyudasPageModule {}
