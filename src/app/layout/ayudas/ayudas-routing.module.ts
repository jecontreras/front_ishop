import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AyudasPage } from './ayudas.page';

const routes: Routes = [
  {
    path: '',
    component: AyudasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AyudasPageRoutingModule {}
