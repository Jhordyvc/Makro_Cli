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
  allProducts:any = 0;
  precioTotal:number = 0;
  ngOnInit(): void {
    this.fapi.getProductData().subscribe(res=>{ 
      this.precioTotal = 0;
      this.products = res;
      this.allProducts = this.fapi.getTotalAmount();
      this.totalItemNumber = res.length;
      console.log(this.totalItemNumber);
      console.log(this.products);
      console.log(this.allProducts);
      for (let i = 0; i < this.products.length; i++) {
          this.precioTotal += this.products[i].precioPro;
      }
      console.log(this.precioTotal);
    })
    
  }

  removeProduct(item:any,x){
    debugger
    let indice = 0;
    for (let i = 0; i < x.length; i++) {
      if(item.codProducto == x[i].codProducto ){
         indice = i;
      }
    }
    this.fapi.removeCartData(item,indice);
    this.precioTotal = 0;
    for (let i = 0; i < this.products.length; i++) {
      this.precioTotal += this.products[i].precioPro;
  }
  }

}
