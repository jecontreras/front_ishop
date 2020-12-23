import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyudasPageRoutingModule } from './ayudas-routing.module';

import { AyudasPage } from './ayudas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyudasPageRoutingModule
  ],
  declarations: [AyudasPage]
})
export class AyudasPageModule {}
