import { Component, OnInit } from '@angular/core';
import { RegalosService } from 'src/app/service-component/regalos.service';

@Component({
  selector: 'app-regalos',
  templateUrl: './regalos.page.html',
  styleUrls: ['./regalos.page.scss'],
})
export class RegalosPage implements OnInit {

  public listRegalos:any = [];
  public ev:any = {};
  public disable_list:boolean = true;
  public data_user:any = {};
  public query:any = {
    where:{
      reseptor: this.data_user.id
    },
    skip: 0
  };
  public evScroll:any = {};

  constructor(
    private _regalos: RegalosService
  ) { }

  ngOnInit() {
    this.get_regalos();
  }
  
  doRefresh(ev){
    this.ev = ev;
    this.disable_list = false;
    this.get_regalos();
  }
  
  loadData(ev){
    //console.log(ev);
    this.evScroll = ev;
    this.query.skip++;
    this.get_regalos();
  }

  async get_regalos(){
    return this._regalos.get(this.query)
    .subscribe((rta:any)=>{
      // console.log(rta);

      if(this.ev){
        this.disable_list = true;
        if(this.ev.target){
          this.ev.target.complete();
        }
      }
      /*this.listRegalos.push(...rta.data );*/
      if( this.evScroll.target ){
        this.evScroll.target.complete()
      }
    }, (err)=>{
      if(this.ev){
        this.disable_list = true;
        if(this.ev.target){
          this.ev.target.complete();
        }
      }
    });
  }

}
