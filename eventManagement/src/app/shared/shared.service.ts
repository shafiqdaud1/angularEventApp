
// import { catchError, filter,map, tap } from 'rxjs/operators';

// import { Injectable } from '@angular/core';

// import { throwError, Observable, observable } from 'rxjs';



// import {HttpClient} from '@angular/common/http';



// // import { url } from 'inspector';




// @Injectable({
//   providedIn: 'root'
// })
// export class SharedService {

//   private readonly modelUrl= 'assets/eventData.json';
//   private readonly ticketUrl='assets/ticket.json';

//   ticket:any;
//   event:any;
//   // eventDetail:any

//   constructor(private httpClient: HttpClient) { }


//   // public getEventDetail(){

//   //   return this.httpClient.get<Array<Events>>(this.modelUrl).pipe(catchError(this.handleResponse));
//   // }





//   public getEvent(index:number)
//   {

//     return this.httpClient.get<Array<Event>>(this.modelUrl).pipe(
//       map((eventData: Array<Event>) => {
//           return eventData[index];
//       }),
//       catchError(this.handleResponse)
//     );

//   }

//   public getTickets(){
//      return  this.httpClient.get<Array<Ticket>>(this.ticketUrl).pipe(catchError(this.handleResponse));

//   }





//   protected handleResponse(data: Response | any): any {
//     if (data) {
//         const body = data.json();
//         if (!body || body.error) {
//             return throwError('somthing went wrong. please try again later.');
//         }
//         return body;
//     } else {
//         return throwError('somthing went wrong. please try again later.');
//     }
//   }
// }
