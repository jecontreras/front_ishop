import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoViewPage } from './producto-view.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoViewPageRoutingModule {}
