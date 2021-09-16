import { Component, OnInit } from '@angular/core';
import {SharedService} from "../shared/shared.service";
import { Params,ActivatedRoute, Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import {Events} from '../model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})

export class EventDetailComponent implements OnInit {
  ticketDetail!:any;
  public index!:any;
  eventDetail:any;

  constructor(
    private router: Router,
    private share:SharedService,
    private route:ActivatedRoute,
    private httpClient: HttpClient
    ) { }



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


      this.httpClient.get<any>(`http://localhost:4000/user/ticket/${this.index}`,requestOptions).subscribe(
        Response=>{
          this.eventDetail=Response;
          console.log(this.eventDetail)


        }
      )

    })

    // this.share.getTickets().subscribe((ticketDetail:any)=>{
    //   this.ticketDetail=ticketDetail;


    // })


  }



}
