import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({
  imports: [
    PipeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosPageRoutingModule
  ],
  providers:[
    SocialSharing
  ],
  declarations: [ProductosPage]
})
export class ProductosPageModule {}
