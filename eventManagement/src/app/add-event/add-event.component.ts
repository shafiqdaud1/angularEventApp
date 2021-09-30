import { AlertifyService } from './../alertify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',


  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  eventName:any;
  Descrition:any;
  location:any;
  datetime:any;




  constructor(private http: HttpClient, private route: Router,private alertify:AlertifyService) { }

  ngOnInit(): void {
  }

  addEvent(){
    var token=localStorage.getItem('adminToken');
    console.log(token);

    const headerDict = {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const data={'Event_Name':this.eventName, 'Description':this.Descrition, 'Location':this.location, 'DateTime':this.datetime}


    this.http.post<any>('http://localhost:4000/admin/addEvent',data,requestOptions).subscribe(res=>{
      console.log(res.Status);
      if(res.Status==200){
        this.alertify.success("Event added  ")
        this.route.navigateByUrl('eventData')
      }
    })


  }

  cancel(){

    this.route.navigateByUrl('eventData')
  }

}
