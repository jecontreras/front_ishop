import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ClientesService } from 'src/app/service-component/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  listClientes:any = [];
  query:any = {
    where:{}
  };
  
  constructor(
    private _cliente: ClientesService
  ) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes(){
    this._cliente.get(this.query).subscribe((res:any)=>{
      this.listClientes = res.data;
    },(error)=>{ console.error(error); });
  }

  borrar(obj:any){

  }

}
