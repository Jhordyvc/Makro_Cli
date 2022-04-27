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
  
  cantidadProducto = 1;
  objProductAll = [];
  objProductSimilar = [];
  listarProductAll(){
    console.log(this.mntProducto);
    this.mntProducto.opcion = 8;
    this.fapi.fapiGetParameter('ListarDetalle',this.mntProducto.opcion+'/'+this.mntProducto.codProducto).subscribe(x=>{
      this.objProductAll = x[0];
      for (let i = 0; i < this.objProductAll.length; i++) {
        this.objProductAll[i].imagenPro=RutaImg+this.objProductAll[i].imagenPro;
      }
      let categoria = this.objProductAll[0].Categoria;
      this.listarProductSimilar(categoria);
    })
  }

  listarProductSimilar(categoria){
    let opcion = 2;
    this.fapi.fapiGetParameter('listarSimilar',opcion+'/'+categoria).subscribe(x=>{
      this.objProductSimilar = x[0];
      for (let i = 0; i < this.objProductSimilar.length; i++) {
        this.objProductSimilar[i].imagenPro=RutaImg+this.objProductSimilar[i].imagenPro;
      }
      console.log("categoria")
      console.log(this.objProductSimilar);
    })
  }

  addToCart(item:any,cantidadProducto){
    debugger
    let totalPagarxProducto=0;
    let pagoEnvio = 0;
    totalPagarxProducto = (Number(item.precioPro) * Number(cantidadProducto));
 

    let producto = {
      index: 0,
      codProducto: item.codProducto,
      nombre: item.nombre,
      descripcionPro: item.descripcionPro,
      detallePro: item.detallePro,
      precioPro: item.precioPro,
      stockPro: item.stockPro,
      imagenPro: item.imagenPro,
      catProducto: item.Categoria,
      marcaProducto: item.Marca,
      cantidad: cantidadProducto,
      totalPagar: totalPagarxProducto,
      estado: item.estado
    }
    let cartTotalPagar={
      total : totalPagarxProducto,
      envio : 0,
      totalPagar: 0
    }
      this.fapi.addToCart(producto,cartTotalPagar);
  }

}
