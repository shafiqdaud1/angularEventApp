import { Component, OnInit } from '@angular/core';
import {SharedService} from "../shared/shared.service";
import { Params,ActivatedRoute, Router } from '@angular/router';
import {Events} from '../model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})

export class EventDetailComponent implements OnInit {
  eventDetail! : Events;
  ticketDetail!:any;
  public index!:any;

  constructor(
    private router: Router,
    private share:SharedService,
    private route:ActivatedRoute) { }



  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.index= +params.id;
      this.share.getEvent(this.index).subscribe((eventDetails:any)=>{
        this.eventDetail=eventDetails;
      })
    })

    this.share.getTickets().subscribe((ticketDetail:any)=>{
      this.ticketDetail=ticketDetail;


    })


  }



}
