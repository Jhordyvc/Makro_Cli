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
  constructor(private fApiRest:HttpClient) { }
  
  getProductData(){ 
    return this.productList.asObservable();
  }
  
  setProduct(product:any){ 
    this.cartDataList.push(...product);
    this.productList.next(product);
  }

  addToCart(product:any){ 
    this.cartDataList.push(product);
    this.productList.next(this.cartDataList);
    this.getTotalAmount();
    console.log(this.cartDataList);
  }

  getTotalAmount(){ 
    let grandTotal = 0;
    this.cartDataList.map((a:any)=>{
      grandTotal += a.total;
    })
  }

  removeCartData(product:any,item){
    debugger
    this.cartDataList.map((a:any,index:any)=>{
      debugger
      console.log(index);
      if(item === index){
      //if(product.codProducto===a.codProducto){
        this.cartDataList.splice(index,1);
      }
    })
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