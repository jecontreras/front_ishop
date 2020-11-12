import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogosPage } from './catalogos.page';

const routes: Routes = [
  {
    path: '',
    component: CatalogosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogosPageRoutingModule {}
