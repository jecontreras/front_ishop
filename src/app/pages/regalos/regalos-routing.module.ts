import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { RegalosPage } from './regalos.page';

const routes: Routes = [
  {
    path: '',
    component: RegalosPage,
    canActivate: [AuthService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegalosPageRoutingModule {}
