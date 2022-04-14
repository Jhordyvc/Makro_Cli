import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RutaImg } from 'src/app/service/configGeneral';
import { FapiService } from '../service/fapi.service';

@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css']
})
export class ProductsingleComponent implements OnInit {

  constructor(private route:ActivatedRoute,private fapi:FapiService) { }
  idDetail = "detralle del producto"
  ngOnInit(): void {
    debugger
    const id = this.route.snapshot.paramMap.get('id');
    this.mntProducto.codProducto =Number(id);
    this.listarProductAll();
  }
  mntProducto={
    opcion:0,
    codProducto:0,
    nombre:'',
    descripcion:'',
    detalle:'',
    precio:0,
    stock:0,
    imagen:'',
    catProducto:0,
    marcaProducto:0,
    estado:0
  }
 
  objProductAll = [];
  listarProductAll(){
    console.log(this.mntProducto);
    this.mntProducto.opcion = 8;
    this.fapi.fapiGetParameter('ListarDetalle',this.mntProducto.opcion+'/'+this.mntProducto.codProducto).subscribe(x=>{
      this.objProductAll = x[0];
      for (let i = 0; i < this.objProductAll.length; i++) {
        this.objProductAll[i].imagenPro=RutaImg+this.objProductAll[i].imagenPro;
      }
      console.log(this.objProductAll);
    })
  }

  addToCart(item:any){
      this.fapi.addToCart(item);
  }

}
