import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormCobrosPage } from './form-cobros.page';

const routes: Routes = [
  {
    path: '',
    component: FormCobrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormCobrosPageRoutingModule {}
