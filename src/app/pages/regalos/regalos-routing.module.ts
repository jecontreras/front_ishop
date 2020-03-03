import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegalosPage } from './regalos.page';

const routes: Routes = [
  {
    path: '',
    component: RegalosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegalosPageRoutingModule {}
