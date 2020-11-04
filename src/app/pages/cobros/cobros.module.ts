import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CobrosPageRoutingModule } from './cobros-routing.module';

import { CobrosPage } from './cobros.page';
import { FormCobrosPageModule } from 'src/app/form/form-cobros/form-cobros.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CobrosPageRoutingModule,
    FormCobrosPageModule
  ],
  declarations: [CobrosPage]
})
export class CobrosPageModule {}
