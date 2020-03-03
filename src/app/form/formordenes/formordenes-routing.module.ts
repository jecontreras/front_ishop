import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormordenesPage } from './formordenes.page';

const routes: Routes = [
  {
    path: '',
    component: FormordenesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormordenesPageRoutingModule {}
