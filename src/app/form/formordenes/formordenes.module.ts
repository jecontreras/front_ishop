import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormordenesPageRoutingModule } from './formordenes-routing.module';

import { FormordenesPage } from './formordenes.page';
import { PipeModule } from 'src/app/pipe/pipe.module';

@NgModule({
  imports: [
    PipeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FormordenesPageRoutingModule
  ],
  declarations: [FormordenesPage]
})
export class FormordenesPageModule {}
