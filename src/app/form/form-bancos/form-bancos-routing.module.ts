import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormBancosPage } from './form-bancos.page';

const routes: Routes = [
  {
    path: '',
    component: FormBancosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormBancosPageRoutingModule {}
