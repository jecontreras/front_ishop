import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogosPageRoutingModule } from './catalogos-routing.module';

import { CatalogosPage } from './catalogos.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogosPageRoutingModule
  ],
  providers:[
    InAppBrowser
  ],
  declarations: [CatalogosPage]
})
export class CatalogosPageModule {}
