

import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';




import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events!:any;
  EventIndex=Number;

  constructor(
    private router:Router,
    private httpClient:HttpClient
    ) { }


  ngOnInit(): void {

      var token=localStorage.getItem('data');

      const headerDict = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };



      this.httpClient.get<any>( 'http://localhost:4000/user/events',requestOptions ).subscribe(
        Response =>{
          //console.log(Response);
          this.events=Response;

          console.log(this.events)
        }
      );



  }

  detail(eventIndex: Number){
    this.router.navigate(['eventDetail',eventIndex]);
  }

  logout(){
    localStorage.setItem('data','');

  }

}
