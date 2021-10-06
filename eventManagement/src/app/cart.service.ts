
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class cartService{
  cart:any=[];
  check:any=[];

  addToCart(data:any){
    this.cart.push(data);
    console.log(this.cart);

    localStorage.setItem('cartItem',JSON.stringify(this.cart))

  }

  getCart(){
    let a=localStorage.getItem('cartItem')
    var b=JSON.stringify(a)
    console.log(b)
    this.check.push(b)
    console.log(this.check)
    return this.cart ;
  }





}
