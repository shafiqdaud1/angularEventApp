
  import { Action } from "@ngrx/store";
  import { ticket} from "./ticket.model"


export enum ActionTypes {
  Add='[ticket] Add to cart',



}

export class AddToCart implements Action{
  readonly type= ActionTypes.Add;

  constructor(public payload: ticket){};
}





export type ActionUnion= AddToCart;
