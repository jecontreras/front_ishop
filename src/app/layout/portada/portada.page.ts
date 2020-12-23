import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.page.html',
  styleUrls: ['./portada.page.scss'],
})
export class PortadaPage implements OnInit {
  
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(
    private _authSrvice: AuthService,
    private _router: Router,
  ) { 
    if (this._authSrvice.isLoggedIn()) {
      this._router.navigate(['/tabs/home']);
    }
  }

  ngOnInit() {
  }
  
  ingresar(){
    this._router.navigate(['login']);
  }

  registrar(){
    this._router.navigate(['registro']);
  }

  ayuda(){
    this._router.navigate(['ayudas']);
  }
}
