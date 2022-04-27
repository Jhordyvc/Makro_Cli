import { Component, OnInit } from '@angular/core';
import { FapiService } from '../service/fapi.service';
import { RutaImg } from 'src/app/service/configGeneral';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private fapi:FapiService) { }

  ngOnInit(): void {
  }
  mntOrden={
    nombre:'',
    apellido:'',
    dni:'',
    orden:0
  }
  Orden : [];
  objOrden : [];
  objDetails = [];
  listarOrden(){
    let opcion=1;
    this.fapi.fapiGetParameter('listarOrden',opcion+'/'+this.mntOrden.dni+'/'+this.mntOrden.nombre+'/'+this.mntOrden.apellido+'/'+this.mntOrden.orden).subscribe(x=>{
      console.log("ordenn")
      console.log(x);
      console.log(x[0]);
      console.log(x[1]);
      this.objOrden = x[0];
      this.objDetails = x[1];
      for (let i = 0; i < this.objDetails.length; i++) {
        this.objDetails[i].imagenPro=RutaImg+this.objDetails[i].imagenPro;
      }
      console.log("=");
      console.log(this.objOrden);
      //this.Orden = this.objOrden;
    })
  }

}
