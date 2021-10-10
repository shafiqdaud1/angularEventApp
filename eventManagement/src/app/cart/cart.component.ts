import { AlertifyService } from './../alertify.service';
import { Component, OnInit } from '@angular/core';
import {cartService} from '../cart.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  array:any=[];
  price: number=0;
  show:boolean=false;
  constructor(private service: cartService, private alertify:  AlertifyService) { }

  ngOnInit(): void {

    this.getDetail()

  }

  getDetail(){

    this.array=this.service.getCart();

    if(this.array.length==0){
      this.show==false;
    }

    for(let i=0; i<this.array.length;i++){
      console.log(this.array[i]['price'])
      this.price=this.price+this.array[i]['price']
      console.log(this.price)
    }

    console.log(this.array)


  }

  del(data:any,index:any){

   for(let i=0;i<this.array.length;i++){
     if(this.array[i]==this.array[index]){
       this.array.splice(i,1)
     }

   }
   localStorage.setItem('cartItem',JSON.stringify(this.array));
    console.log(this.array)
    this.price=this.price-data['price']
    this.alertify.warning('Item removed from cart')
  }

}


