import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { ProductoViewPage } from './producto-view.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoViewPage,
    canActivate: [AuthService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoViewPageRoutingModule {}
