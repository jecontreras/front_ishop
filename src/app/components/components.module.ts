import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { PipeModule } from '../pipe/pipe.module';
import { BuscadorComponent } from './buscador/buscador.component';



@NgModule({
  entryComponents:[
    BuscadorComponent
  ],
  declarations: [
    HeaderComponent,
    BuscadorComponent
  ],
  exports: [
    HeaderComponent,
    BuscadorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipeModule
  ],
})
export class ComponentsModule { }
