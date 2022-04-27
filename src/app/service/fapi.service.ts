import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{RutaMvc} from './configGeneral';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FapiService {
  cartDataList:any = [];
  productList = new BehaviorSubject<any>([]);
  totalDataList:any = [];
  cartList = new BehaviorSubject<any>([]);
  tarjetaDataList:any = [];
  tarjetaList = new BehaviorSubject<any>([]);

  constructor(private fApiRest:HttpClient) { }
  
  getProductData(){ 
    return this.productList.asObservable();
  }
  getTarjetaData(){ 
    return this.tarjetaList.asObservable();
  }
  getTotalData(){
    return this.cartList.asObservable();
  }
  
  setProduct(product:any){ 
    this.cartDataList.push(...product);
    this.productList.next(product);
  }

  addToCart(product:any,cartTotal:any){ 
    debugger
    this.cartDataList.push(product);
    for (let i = 0; i < this.cartDataList.length; i++) {
      if((Number(this.cartDataList.length)-1) == i){
        this.cartDataList[i].index = (Number(this.cartDataList.length)-1);
      }
    }
    this.productList.next(this.cartDataList);
    /*Precio Carrito*/
    if(this.totalDataList.length<=0){
      debugger
      this.totalDataList.push(cartTotal);
      if(cartTotal.total<199){
        this.totalDataList[0].envio = 30;
      }else{
        this.totalDataList[0].envio = 0;
      }
      this.totalDataList[0].totalPagar = (Math.round(this.totalDataList[0].envio + this.totalDataList[0].total)); 
    }else{
      debugger
      this.totalDataList[0].totalPagar = 0;
      this.totalDataList[0].total = 0;
      this.cartDataList.map((a:any,index:any)=>{
        this.totalDataList[0].total +=(Math.round(Number(this.cartDataList[index].totalPagar)));
      })
      if(this.totalDataList[0].total<199){
        this.totalDataList[0].envio = 30;
      }else{
        this.totalDataList[0].envio = 0;
      }
      this.totalDataList[0].totalPagar = (Math.round(this.totalDataList[0].envio + this.totalDataList[0].total)); 
    }
    this.cartList.next(this.totalDataList);
    /**/
    this.getTotalAmount();
    console.log(this.cartDataList);
  }

  /*tarjeta credito*/
  addTotarjeta(tarjeta:any){ 
    debugger
    if(this.tarjetaDataList.length == 0){
      this.tarjetaDataList.push(tarjeta);
    }
    else{
      this.tarjetaDataList[0].nroTarjeta = tarjeta.nroTarjeta;
      this.tarjetaDataList[0].nombre = tarjeta.nombre;
      this.tarjetaDataList[0].cvv = tarjeta.cvv;
      this.tarjetaDataList[0].mes = tarjeta.mes;
      this.tarjetaDataList[0].dni = tarjeta.dni;
      this.tarjetaDataList[0].cantidadPagar = tarjeta.cantidadPagar;
      console.log(this.tarjetaDataList);
    }
    this.tarjetaList.next(this.tarjetaDataList);
  }

  /**/
  getTotalAmount(){ 
    debugger
    let grandTotal = 0;
    this.cartDataList.map((a:any)=>{
      grandTotal += a.totalPagar;
    })
    return grandTotal;
  }

  removeCartData(product:any){
    debugger
    this.cartDataList.map((a:any,index:any)=>{
      debugger
      if(product.index===a.index){
        this.cartDataList.splice(index,1);
      }
    })
    this.totalDataList[0].total = 0;
    this.cartDataList.map((a:any,index:any)=>{
      this.totalDataList[0].total+=(Math.round(Number(this.cartDataList[index].totalPagar)));
    })
   if(this.cartDataList.length>0){
      if(this.totalDataList[0].total<199){
        this.totalDataList[0].envio = 30;
      }else{
        this.totalDataList[0].envio = 0;
      }
      this.totalDataList[0].totalPagar = (Math.round(Number(this.totalDataList[0].envio) + Number(this.totalDataList[0].total))); 
   }
   if(this.cartDataList.length == 0){
      this.totalDataList = [];
    }
    this.cartList.next(this.totalDataList);
  }


  fapiPost(api,obj:any):Observable<any>{
    return this.fApiRest.post(RutaMvc+api,obj,{responseType: 'text'});
  }

  fapiGet(api){
    return this.fApiRest.get(RutaMvc+api);
  }

  fapiPut(api,obj:any):Observable<any>{
    return this.fApiRest.put(RutaMvc+api,obj,{responseType: 'text'});
  }
  
  fapiGetParameter(api,obj){
    return this.fApiRest.get(RutaMvc+api+"/"+obj);
  }
}