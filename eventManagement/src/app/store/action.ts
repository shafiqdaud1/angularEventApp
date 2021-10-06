
  import { Action } from "@ngrx/store";

interface ticket {
  Name: String,
  Date: String,
  Time: String,
  Venue:String,
  Category:String,
  price: number,
  Quantity:number,

}

export enum ActionTypes {
  Add='[ticket] Add to cart',
  Remove='[ticket] Remove from cart',
  loadItems='[ticket]Load items from server',
  LoadSuccess='[ticket]Load Success'

}

export class AddToCart implements Action{
  readonly type= ActionTypes.Add;

  constructor(public payload: ticket){};
}

export class RemoveCart implements Action{
  readonly type=ActionTypes.Remove;

  constructor(public payload: ticket){};
}

export class GetTickets implements Action{
  readonly type= ActionTypes.loadItems;
}

export class LoadTicket implements Action{
  readonly type= ActionTypes.LoadSuccess;

  constructor(public payload: ticket[]) {}
}



export type ActionUnion= AddToCart| RemoveCart | LoadTicket |GetTickets;
