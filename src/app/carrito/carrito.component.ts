import { Component, OnInit } from '@angular/core';
import { FapiService } from '../service/fapi.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private fapi:FapiService,private toast:ToastrService,private router: Router) { }
  products:any = [];
  allProducts:any = 0;
  precioTotal:number = 0;
  precioEnvio:0;
  precioSubTotal:0;

  ngOnInit(): void {
    this.fapi.getProductData().subscribe(res=>{ 
      this.products = res;
      this.allProducts = this.fapi.getTotalAmount();
      console.log(this.products);
      console.log(this.allProducts);
    })
    this.fapi.getTotalData().subscribe(res=>{
      debugger
      if(res.length>0){
        this.precioTotal = res[0].totalPagar;
        this.precioEnvio = res[0].envio;
        this.precioSubTotal = res[0].total;
      }else{
        this.precioTotal = 0;
        this.precioEnvio = 0;
        this.precioSubTotal=0;
      }
    })
  }
  removeProduct(item:any){
    this.fapi.removeCartData(item);
    this.precioTotal = 0;
    for (let i = 0; i < this.products.length; i++) {
      this.precioTotal += this.products[i].totalPagar;
    }
  }
  mntTarjeta = {
    opcion:0,
    nroTarjeta:'',
    nombre:'',
    cvv:'',
    mes:'',
    dni: '',
    cantidadPagar:0.0
  }
  validarTarjeta(){
    this.mntTarjeta.opcion = 1;
    this.mntTarjeta.cantidadPagar = this.precioTotal;
    this.fapi.fapiGetParameter('validarTarjeta',this.mntTarjeta.opcion+'/'+this.mntTarjeta.nroTarjeta+'/'+this.mntTarjeta.nombre+'/'+this.mntTarjeta.cvv+'/'+this.mntTarjeta.cantidadPagar).subscribe(x=>{
      if(x[0][0].Validar=='SI'){
          console.log("SI");
          console.log(x[0][0]);
          this.fapi.addTotarjeta(this.mntTarjeta);
          this.router.navigate(['/checkout']);
      }else{
        console.log("no");
        console.log(x[0]);
      }
    })
  }
}
