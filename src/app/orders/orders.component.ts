import { Component, OnInit } from '@angular/core';
import { FapiService } from '../service/fapi.service';
import { RutaImg } from 'src/app/service/configGeneral';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private fapi:FapiService) { }

  ngOnInit(): void {
  }


  mntOrden={
    nombre:'null',
    apellido:'null',
    dni:'null',
    orden:''
  }
  Orden : [];
  objOrden : [];
  objDetails = [];
  listarOrden(){
    let opcion=2;
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
