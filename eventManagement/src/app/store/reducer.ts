import { Action } from '@ngrx/store';

import { ActionUnion, ActionTypes } from "./action";

export const initialState={
  items:[],
  cart:[]
}


export function ShopReducer(state=initialState, action:ActionUnion){
  switch(action.type){

    case ActionTypes.LoadSuccess:
    return {
      ...state,
      items: [...action.payload]
    };


    case ActionTypes.Add:return {
      ...state,
      cart:[...state.cart,action.payload]

    };

    case ActionTypes.Remove: return{
      ...state,
      cart: [...state.cart]
    }

    default: return state;
  }
}
