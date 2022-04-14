import { Component, OnInit } from '@angular/core';
import { FapiService } from '../service/fapi.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private fapi:FapiService) { }
  products:any = [];
  allProducts:any = 0;

  ngOnInit(): void {
    this.fapi.getProductData().subscribe(res=>{ 
      this.products = res;
      this.allProducts = this.fapi.getTotalAmount();
      console.log(this.products);
      console.log(this.allProducts);
    })
  }

}
