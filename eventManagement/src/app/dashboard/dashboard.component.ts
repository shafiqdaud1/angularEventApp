import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav'
import { BreakpointObserver } from '@angular/cdk/layout';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chart:any = [];
  events:any;
  userLenght:any;



  constructor( private observer: BreakpointObserver,private httpClient: HttpClient, private router: ActivatedRoute, private route:Router ) { }

  ngOnInit(): void {

    var token=localStorage.getItem('adminToken');
    console.log(token);

    const headerDict = {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };


     this.httpClient.get<any>('http://localhost:4000/user/events',requestOptions).subscribe(
       Response=>{
        this.events=Response.length;
        console.log(this.events);

        this.httpClient.get<any>('http://localhost:4000/user/userData').subscribe(
          response1=>{
            this.userLenght=response1.length;


            this.chart=new Chart('canvas',{
              type: 'bar',
             data: {
               datasets: [
                 {
                   data:[this.events,this.userLenght],
                   label:'Stats',
                   backgroundColor: '#007bff',

                 }
               ],
                    labels: ['Events','Users'],
             },
             options: {
               responsive: true,
               scales: {
                 yAxes: [{
                   ticks: {
                     suggestedMin:0,
                     suggestedMax:10,
                     beginAtZero:true
                   }
                 }]
               }

               }
             }

           )


          }
        )







      }

     )


    }




  showUser(){
    this.route.navigateByUrl('userData')

  }

  eventsShow(){

    this.route.navigateByUrl('eventData')

  }

  showTickets(){
    this.route.navigateByUrl('ticketData')
  }

  ShowDashBoard(){
    this.route.navigateByUrl('dashboard')
  }


}

