import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormBancosPageRoutingModule } from './form-bancos-routing.module';

import { FormBancosPage } from './form-bancos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormBancosPageRoutingModule
  ],
  declarations: [FormBancosPage]
})
export class FormBancosPageModule {}
