import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoViewPageRoutingModule } from './producto-view-routing.module';

import { ProductoViewPage } from './producto-view.page';
import { PipeModule } from 'src/app/pipe/pipe.module';

@NgModule({
  imports: [
    PipeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoViewPageRoutingModule
  ],
  declarations: [ProductoViewPage]
})
export class ProductoViewPageModule {}
