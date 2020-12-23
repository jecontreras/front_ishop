import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToolsService } from 'src/app/services/tools.service';
import { PersonaAction } from 'src/app/redux/app.actions';
import { PERSONA } from 'src/app/interfas/sotarage';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  data:any = {};
  disablePass:boolean = false;

  constructor(
    private _user: UserService,
    private _tools: ToolsService,
    private _store: Store<PERSONA>,
    private _router: Router,
    private _authSrvice: AuthService
  ) { 
    if (this._authSrvice.isLoggedIn()) {
      this._router.navigate(['/tabs/home']);
    }
  }

  ngOnInit() {
  }
  validarDocumento(){
    this._user.get({where:{cedula: this.data.cedula}}).subscribe((res:any)=>{
      if(res.data[0]){this.disablePass = true;}
      else {this._tools.presentToast("Usuario no encontrado")} 
      this._tools.dismisPresent();
    },error=>{ 
      this._tools.presentToast("Error de documento");
      this._tools.dismisPresent();
    });
  }
  iniciar(){
    this._tools.presentLoading();
    if(this.data.cedula && !this.data.password)return this.validarDocumento();
    else{
      this._user.login(this.data).subscribe((res:any)=>{
        this._tools.dismisPresent();
        if(res.success){
          let accion:any = new PersonaAction(res.data, 'post');
          this._store.dispatch(accion);
          setTimeout( () => { this._router.navigate(['/tabs/home']); }, 2000 );
        }else{
          this.data.password = "";
          this._tools.presentToast("Error de login");
        }
      },(error)=>{
        this._tools.presentToast("Error de servidor")
        this._tools.dismisPresent();
      });
    }
  }

}
