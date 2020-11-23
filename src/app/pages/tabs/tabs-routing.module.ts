import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AuthService } from 'src/app/services/auth.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthService],
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'productos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../productos/productos.module').then(m => m.ProductosPageModule)
          }
        ]
      },
      {
        path: 'clientes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../clientes/clientes.module').then(m => m.ClientesPageModule)
          }
        ]
      },
      {
        path: 'notificacion',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../notificaciones/notificaciones.module').then(m => m.NotificacionesPageModule)
          }
        ]
      },
      {
        path: 'ofertas',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../ofertas/ofertas.module').then(m => m.OfertasPageModule)
          }
        ]
      },
      {
        path: 'ordenes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../ordenes/ordenes.module').then(m => m.OrdenesPageModule)
          }
        ]
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../chat/chat.module').then(m => m.ChatPageModule)
          }
        ]
      },
      {
        path: 'categorias',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../categorias/categorias.module').then(m => m.CategoriasPageModule)
          }
        ]
      },
      {
        path: 'productoView/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../producto-view/producto-view.module').then(m => m.ProductoViewPageModule)
          }
        ]
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../perfil/perfil.module').then(m => m.PerfilPageModule)
          }
        ]
      },
      {
        path: 'menu',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../menu/menu.module').then(m => m.MenuPageModule)
          }
        ]
      },
      {
        path: 'regalos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../regalos/regalos.module').then(m => m.RegalosPageModule)
          }
        ]
      },
      {
        path: 'cobros',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../cobros/cobros.module').then( m => m.CobrosPageModule)
          }
        ]
      },
      {
        path: 'catalogos',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../catalogos/catalogos.module').then( m => m.CatalogosPageModule)
          }
        ]
      },
      {
        path: 'embajadores',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../embajadores/embajadores.module').then( m => m.EmbajadoresPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
