import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortadaPage } from './portada.page';

const routes: Routes = [
  {
    path: '',
    component: PortadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortadaPageRoutingModule {}
