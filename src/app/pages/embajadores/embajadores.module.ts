import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmbajadoresPageRoutingModule } from './embajadores-routing.module';

import { EmbajadoresPage } from './embajadores.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmbajadoresPageRoutingModule
  ],
  providers:[
    InAppBrowser
  ],
  declarations: [EmbajadoresPage]
})
export class EmbajadoresPageModule {}
