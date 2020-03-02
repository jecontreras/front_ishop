import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

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
    private _user: UserService
  ) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes(){
    this._user.clientes(this.query).subscribe((res:any)=>{
      this.listClientes = res.data;
    },(error)=>{ console.error(error); });
  }

  borrar(obj:any){

  }

}
