import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { PipeModule } from '../pipe/pipe.module';
import { BuscadorComponent } from './buscador/buscador.component';
import { AppRoutingModule } from '../app-routing.module';



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
    AppRoutingModule, 
    CommonModule,
    IonicModule,
    PipeModule
  ],
})
export class ComponentsModule { }
