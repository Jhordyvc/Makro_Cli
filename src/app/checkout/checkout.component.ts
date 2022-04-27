import { Component, OnInit } from '@angular/core';
import { FapiService } from '../service/fapi.service';
import {Router} from "@angular/router";
import { TranslationWidth } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private fapi:FapiService,private router: Router) { }
  products:any = [];
  total:any = 0;
  allProducts:any = 0;
  precioTotal:number = 0;
  precioEnvio: 0;
  precioSubTotal:0;
  totalItemNumber:number = 0;

  nroTarjeta:''
  nombre:'';
  cvv:'';
  mes:'';
  dni: '';
  cantidadPagar:0.0;
  objOrden={
    opcion:0,
    dni:'',
    cantidad:0,
    subTotal:0,
    Envio:0,
    direccion:'',
    email:'',
    celular:'',
    total:0,
    idProducto:0
  }
  objOrdenDetails = {
    opcion:0,
    dni:'',
    cantidad:0,
    subTotal:0,
    Envio:0,
    direccion:'',
    email:'',
    celular:'',
    total:0,
    idProducto:0
  }
  nombreTitular = '';
  cantidadProducto =0;
  ngOnInit(): void {
    this.fapi.getTarjetaData().subscribe(res=>{
      console.log("tarjeta")
      console.log(res);
      if(res.length>0){
      this.dni = res[0].dni;
      this.nombre = res[0].nombre;
      this.nroTarjeta = res[0].nroTarjeta;
      this.cvv = res[0].cvv;
      this.cantidadPagar = res[0].cantidadPagar;
      this.mes = res[0].mes;
     }else{
      this.dni = '';
      this.nombre = '';
      this.nroTarjeta = '';
      this.cvv = '';
      this.cantidadPagar = 0;
      this.mes = ''
     }
    })
    this.fapi.getProductData().subscribe(res=>{ 
      this.precioTotal = 0;
      this.products = res;
      this.allProducts = this.fapi.getTotalAmount();
      this.cantidadProducto=0;
      for (let i = 0; i < this.products.length; i++) {
          this.cantidadProducto += this.products[i].cantidad;
      }
    })
    this.fapi.getTotalData().subscribe(res=>{
      debugger
      if(res.length>0){
        this.precioTotal = res[0].totalPagar;
        this.precioEnvio = res[0].envio;
        this.precioSubTotal = res[0].total;
        console.log("previo pagar")
        console.log(res);
      }else{
        this.precioTotal = 0;
        this.precioEnvio = 0;
        this.precioSubTotal=0;
      }
    })
    
  }



 idProducto = 0;
  registrarOrden(){
    this.objOrden.opcion=1;
    this.objOrden.Envio= this.precioEnvio;
    this.objOrden.cantidad= this.cantidadProducto;
    this.objOrden.dni=this.dni;
    this.objOrden.subTotal=this.precioTotal;
    this.objOrden.total=this.precioTotal;
    console.log(this.objOrden);
     this.fapi.fapiPost('addOrden',this.objOrden).subscribe(x=>{
      if(x='ok'){
        for (let i = 0; i < this.products.length; i++) {
          this.idProducto = this.products[i].codProducto;
          console.log("idProducto");
          console.log(this.idProducto);
          this.registrarDetails(this.idProducto,this.objOrden);
        }
        this.enviarCorreo();
      }
    })
  }
  registrarDetails(item,objOrden){
    this.objOrdenDetails.opcion = 2;
    this.objOrdenDetails.idProducto = item;
    this.objOrdenDetails.dni=objOrden.dni;
    this.objOrdenDetails.cantidad=objOrden.cantidad;
    this.objOrdenDetails.subTotal=objOrden.subTotal;
    this.objOrdenDetails.Envio=objOrden.Envio;
    this.objOrdenDetails.direccion=objOrden.direccion;
    this.objOrdenDetails.email=objOrden.email;
    this.objOrdenDetails.celular=objOrden.celular;
    this.objOrdenDetails.total=objOrden.total;
    this.fapi.fapiPost('addOrden',this.objOrdenDetails).subscribe(x=>{
      if(x='ok'){
          console.log("registrado correctamente");
      }
    })
  } 
  mntCorreo = {
    nroPedido: 'xxxxxx',
    nombre: 'hamburguesa',
    cantidad: 1,
    precio: 10,
    totalPago: 10
  }
  objCorreo = {
    producto : [],
    precioSubTotal:0,
    precioEnvio:0,
    precioTotal:0,
    gmailTo:'',
    nombre:'',
  }
  enviarCorreo(){
    this.objCorreo.producto = this.products;
    this.objCorreo.precioSubTotal = this.precioSubTotal;
    this.objCorreo.precioEnvio = this.precioEnvio;
    this.objCorreo.precioTotal = this.precioTotal;
    this.objCorreo.gmailTo = this.objOrden.email;
    this.objCorreo.nombre = this.nombre;
    this.fapi.fapiPost('sendEmail',this.objCorreo).subscribe(x=>{
      if(x='ok'){
        this.router.navigate(['/compra']);
        console.log("envio correo");
      }
    })
  }
}
