import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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




  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
  }

  addEvent(){
    const headers= {'content-type':'application/json'};

    const data={'Event_Name':this.eventName, 'Description':this.Descrition, 'Location':this.location, 'DateTime':this.datetime}


    this.http.post<any>('http://localhost:4000/admin/addEvent',data,{headers}).subscribe(res=>{
      console.log(res.Status);
      if(res.Status==200){
        alert('event added')
        this.route.navigateByUrl('eventData')
      }
    })


  }

  cancel(){

    this.route.navigateByUrl('eventData')
  }

}
