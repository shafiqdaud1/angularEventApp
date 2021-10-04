import {  NgPopupsService } from 'ng-popups';
import { AlertifyService } from './../alertify.service';
import { Component, OnInit } from '@angular/core';

import { Params,ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HostListener } from '@angular/core';
import { PlatformLocation } from '@angular/common'




@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})

export class EventDetailComponent implements OnInit {
  ticketDetail!:any;
  public index!:any;
  eventDetail:any;
  formattedDate:any;
  formattedTime:any;
  id:any

  constructor(
    private router: Router,

    private route:ActivatedRoute,
    private httpClient: HttpClient,
    private alertify:AlertifyService,
    private location: PlatformLocation,
    private popup: NgPopupsService
    ) {
      location.onPopState(()=>{
        localStorage.setItem('id','');
        this.id=localStorage.getItem('id');


       // alert(window.location)
      })

     }



  ngOnInit() {


    var token=localStorage.getItem('data');

      const headerDict = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };




    this.route.params.subscribe((params: Params)=>{
      this.index= +params.id;
      console.log(this.index)

      localStorage.setItem('id', this.index);


      this.httpClient.get<any>(`http://localhost:4000/user/ticket/${this.index}`,requestOptions).subscribe(
        Response=>{
          console.log(Response.status)
          if(Response.status==200){
            this.eventDetail=Response.array;





          }else{
            this.alertify.error(Response)
          }



        }
      )

    })




  }



  logout(){

    localStorage.setItem('data','')
  }





}
