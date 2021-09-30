import { AlertifyService } from './../alertify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { arrayMax } from 'highcharts';
@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {
  private sub: any;

  data:any=[];
  eventID:any;
  eventName:any;
  eventDescription:any;
  eventLocation:any;
  eventDateTime:any;
  check:any=[];


  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient,
    private alertify: AlertifyService
    ) {

  }

  ngOnInit(): void {
    this.data.push(history.state);



    this.eventID=this.data[0].Event_ID;
    this.eventName=this.data[0].Event_Name;
    this.eventDescription=this.data[0].Description;
    this.eventDateTime=this.data[0].DateTime;
    this.eventLocation=this.data[0].Location;

   // console.log(this.DateTime)


  }

  updateEvent(){
    var token=localStorage.getItem('adminToken');
    console.log(token);

    const headerDict = {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    console.log(this.eventID)

    const data={'Event_Name':this.eventName, 'Description':this.eventDescription, 'Location':this.eventLocation, 'DateTime':this.eventDateTime}
    this.http.put(`http://localhost:4000/admin/updateEvent/${this.eventID}`,data,requestOptions).subscribe(Response=>{

      this.check.push(Response)
      if(this.check[0]["status"]==200){

        this.alertify.success('Event Updated')
        this.router.navigateByUrl('eventData')
      }else{
        this.alertify.error("Cannot Update");
      }



    })
  }

  cancel(){
    this.alertify.warning("update cancel")
    this.router.navigateByUrl('eventData');
  }




}
