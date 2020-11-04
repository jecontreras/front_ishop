import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormCobrosPageRoutingModule } from './form-cobros-routing.module';

import { FormCobrosPage } from './form-cobros.page';
import { FormBancosPageModule } from '../form-bancos/form-bancos.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormCobrosPageRoutingModule,
    FormBancosPageModule
  ],
  declarations: [FormCobrosPage]
})
export class FormCobrosPageModule {}
