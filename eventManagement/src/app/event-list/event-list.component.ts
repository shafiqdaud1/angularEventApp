import { AlertifyService } from './../alertify.service';


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
  date:any;
  time:any;
  EventIndex=Number;
  formattedDate:any=[];
  formattedTime:any=[];
  check:any;

  constructor(
    private router:Router,
    private httpClient:HttpClient,
    private alertify: AlertifyService
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

          if(Response.status==200){
            this.events=Response.array;



          }else{
            this.alertify.error(Response)
          }

          console.log(Response.status);


          for(let i =0; i<this.events.length;i++){

            //console.log(this.events[i]['DateTime'])



          }

          console.log(this.check)


        }
      );



  }

  detail(eventIndex: Number){
    localStorage.setItem('eventID',eventIndex.toString())
    this.router.navigate(['eventDetail',eventIndex]);
  }

  logout(){
    localStorage.setItem('data','');

  }

}
