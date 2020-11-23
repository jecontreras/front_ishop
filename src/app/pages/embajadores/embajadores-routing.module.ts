import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmbajadoresPage } from './embajadores.page';

const routes: Routes = [
  {
    path: '',
    component: EmbajadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmbajadoresPageRoutingModule {}
