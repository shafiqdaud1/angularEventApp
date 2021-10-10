import { Action } from '@ngrx/store';
import {ticket} from './ticket.model'

import { ActionUnion, ActionTypes, AddToCart } from "./action";


  export const initialState:Array<ticket>=[
{
  Name: 'PSL',
  Date: "10/06/2021",
  Time: "10:45Pm",
  Venue:"Lahore",
  Category:"Gold",
  price: 410,
  Quantity:4,
}
]


export function ShopReducer(state:Array<ticket>=initialState, action:ActionUnion){

 switch(action.type){
   case ActionTypes.Add:
      return  [...state, action.payload];
   default: return state;
 }
}
