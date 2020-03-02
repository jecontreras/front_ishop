import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service-component/categoria.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfas/sotarage';
import { Store } from '@ngrx/store';
import { BuscadorAction } from 'src/app/redux/app.actions';
import { SubcategoriaService } from 'src/app/service-component/subcategoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  listCategorias:any = [];
  constructor(
    private _categoria: SubcategoriaService,
    private _tools: ToolsService,
    private _store: Store<STORAGES>,
    private _router: Router
  ) { 
  }

  ngOnInit() {
    this.getCategorias();
  }
  getCategorias(){
    this._categoria.get({where:{estado:0}}).subscribe((res:any)=>{
      this.listCategorias = res.data;
      console.log(res);
    },(error)=>{ console.error(error); this._tools.presentToast('Error de Servidor'); })
  }
  openCategoria(obj:any){
    this._tools.presentLoading();
    let accion = new BuscadorAction({
      opt: 'categoria',
      value: obj.id
    }, 'post');
    this._store.dispatch(accion);
    var intervalID = window.setTimeout(()=>{
      this._tools.dismisPresent();
      this._router.navigate(['/tabs/productos']);
    }, 500);
  }

}
