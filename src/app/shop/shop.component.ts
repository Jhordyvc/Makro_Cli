import { Component, OnInit,Input } from '@angular/core';
import { RutaImg } from 'src/app/service/configGeneral';
import { FapiService } from '../service/fapi.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @Input() idProducto:any;
  constructor(private fapi:FapiService) { }

  ngOnInit(): void {
    this.listarProductAll();
    this.listarCategoria();
    this.listarMarca();
    this.listarPopular();
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
  objPopular = [];
  listarProductAll(){
    this.mntProducto.opcion = 5;
    this.mntProducto.estado = 1;
    this.fapi.fapiGetParameter('listProducto',this.mntProducto.opcion+'/'+this.mntProducto.estado).subscribe(x=>{
      this.objProductAll = x[0];
      for (let i = 0; i < this.objProductAll.length; i++) {
        this.objProductAll[i].imagenPro=RutaImg+this.objProductAll[i].imagenPro;
      }
      console.log(this.objProductAll);
    })
  }
  listarPopular(){
    let opcion = 1;
    this.fapi.fapiGetParameter('listarPopular',opcion).subscribe(x=>{
      this.objPopular = x[0];
      for (let i = 0; i < this.objPopular.length; i++) {
        this.objPopular[i].imagenPro=RutaImg+this.objPopular[i].imagenPro;
      }
      console.log(this.objPopular);
    })
  }
  filtrarCategoria(){
    this.mntProducto.opcion = 6;
    this.mntProducto.catProducto = 3;
    this.fapi.fapiGetParameter('listCatProducto',this.mntProducto.opcion+'/'+this.mntProducto.catProducto).subscribe(x=>{
      this.objProductAll = x[0];
      for (let i = 0; i < this.objProductAll.length; i++) {
        this.objProductAll[i].imagenPro=RutaImg+this.objProductAll[i].imagenPro;
      }
      console.log(this.objProductAll);
    })
  }
  filtrarMarca(){
    this.mntProducto.opcion = 7;
    this.mntProducto.marcaProducto = 1;
    this.fapi.fapiGetParameter('listMarcaProducto',this.mntProducto.opcion+'/'+this.mntProducto.marcaProducto).subscribe(x=>{
      this.objProductAll = x[0];
      for (let i = 0; i < this.objProductAll.length; i++) {
        this.objProductAll[i].imagenPro=RutaImg+this.objProductAll[i].imagenPro;
      }
      console.log(this.objProductAll);
    })
  }

  objCategoria : [];
  listarCategoria(){
    let opcion=10;
    let maestroId=3;
    this.fapi.fapiGetParameter('listMaestro',opcion+'/'+maestroId).subscribe(x=>{
      this.objCategoria=x[0];
      console.log(this.objCategoria);
    });
  }
  objMarca : [];
  listarMarca(){
    let opcion=10;
    let maestroId=4;
    this.fapi.fapiGetParameter('listMaestro',opcion+'/'+maestroId).subscribe(x=>{
      this.objMarca=x[0];
      console.log(this.objMarca);
    });
  }
  
}
