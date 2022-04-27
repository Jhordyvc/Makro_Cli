import { Component, OnInit } from '@angular/core';
import { FapiService } from '../service/fapi.service';
import { RutaImg } from 'src/app/service/configGeneral';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fapi:FapiService) { }

  ngOnInit(): void {
    this.listarProducto();
    this.listarNewProducto();
    this.listarmasVendidos();
  }
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1} ;

  objNewProduct = []; 
  objProducts = []; 
  objProduct = {
    opcion: 0
  }
  listarNewProducto(){
    debugger
    this.objProduct.opcion = 1
    this.fapi.fapiGetParameter('listarNuevoIngresos',this.objProduct.opcion).subscribe(x=>{
        this.objNewProduct = x[0];
        for (let i = 0; i < this.objNewProduct.length; i++) {
          this.objNewProduct[i].imagenPro=RutaImg+this.objNewProduct[i].imagenPro;
        }
        console.log("new product");
        console.log(this.objNewProduct);
    })
  }
  listarProducto(){
    this.objProduct.opcion = 2
    this.fapi.fapiGetParameter('listarNuevoIngresos',this.objProduct.opcion).subscribe(x=>{
        this.objProducts = x[0];
        for (let i = 0; i < this.objProducts.length; i++) {
          this.objProducts[i].imagenPro=RutaImg+this.objProducts[i].imagenPro;
        }
        console.log(this.objProducts);
    })
  }
  objVendidos = [];
  listarmasVendidos(){
    let opcion = 3
    this.fapi.fapiGetParameter('listarNuevoIngresos',opcion).subscribe(x=>{
        this.objVendidos = x[0];
        for (let i = 0; i < this.objVendidos.length; i++) {
          this.objVendidos[i].imagenPro=RutaImg+this.objVendidos[i].imagenPro;
        }
        console.log("mas vendidos")
        console.log(this.objVendidos);
    })
  }

}
