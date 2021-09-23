import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
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

  name:any;
  Description:any;
  Location:any;
  DateTime:any;

  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient) {

  }

  ngOnInit(): void {
    this.data.push(history.state);



    this.eventID=this.data[0].Event_ID;
    this.name=this.data[0].Event_Name;
    this.Description=this.data[0].Description;
    this.DateTime=this.data[0].DateTime;
    this.Location=this.data[0].Location;

   // console.log(this.DateTime)


  }

  updateEvent(){
    console.log(this.eventID)
    const headers= {'content-type':'application/json'};
    const data={'Event_Name':this.eventName, 'Description':this.eventDescription, 'Location':this.eventLocation, 'DateTime':this.DateTime}
    this.http.put(`http://localhost:4000/admin/updateEvent/${this.eventID}`,data,{headers}).subscribe(res=>{

    })
  }

  cancel(){

    this.router.navigateByUrl('eventData');
  }




}
