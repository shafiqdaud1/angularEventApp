import { Component } from '@angular/core';
import * as $ from 'jquery' ;
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eventManagement';
  showButton:boolean=false;




  constructor(private route: Router ) {
    route.events.forEach((event) => {
      if(event instanceof NavigationStart) {
          this.showButton = event.url !== "/login" && event.url !== "/adminLogin" && event.url!=='/register' && event.url!=='/eventList' &&
          event.url!=='/ticketCategory' && event.url!=='/addTicketCategory' && event.url!=='/addCategory'
          && event.url!==`/eventDetail/${localStorage.getItem('eventID')}` && event.url!=='/dashboard'
          && event.url!=='/userData' && event.url!=='/ticketData' && event.url!=='/eventData' && event.url!=='/addevent'
          && event.url!=='/addticket'
          && event.url!=='/updateEvent' && event.url!=='/updateTicket' && event.url!=='/forgotPass' && event.url !== '/cart' ;
      }
    });
  }




}
