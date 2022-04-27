import { Component, OnInit } from '@angular/core';
import { FapiService } from '../service/fapi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalItemNumber:number = 0;
  constructor(private fapi:FapiService,private toast:ToastrService) { }
  products:any = [];
  total:any = 0;
  allProducts:any = 0;
  precioTotal: 0;
  precioEnvio: 0;
  precioSubTotal:0
  ngOnInit(): void {
    debugger
    this.fapi.getProductData().subscribe(res=>{ 
      this.precioTotal = 0;
      this.products = res;
      this.allProducts = this.fapi.getTotalAmount();
      this.totalItemNumber = res.length;
      console.log("obtener carrito")
      console.log(this.totalItemNumber);
      console.log(this.products);
      console.log(this.allProducts);
      /*for (let i = 0; i < this.products.length; i++) {
          this.precioTotal += this.products[i].totalPagar;
      }*/
    })
    debugger
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
      console.log("precioooo")
      console.log(this.precioTotal);
      console.log(this.precioEnvio);
      console.log(this.precioSubTotal);
    })
  }

  removeProduct(item:any){
    debugger
    this.fapi.removeCartData(item);
    
  }

}
