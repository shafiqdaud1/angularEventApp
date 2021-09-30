import { AlertifyService } from './../alertify.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';



@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {
  category: any=[];
  event: any=[];
  eventName:any;
  catName:any;
  ticketsAvailable: any;
  price:any;

  constructor(private http :HttpClient, private route: Router, public dialog: MatDialog, private alertify: AlertifyService) {  }

  openDialog() {
    const dialogRef = this.dialog.open(AddTicketComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

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

    this.http.get<any>('http://localhost:4000/user/AdminTicketCategory',requestOptions).subscribe(Response=>{
      this.category=Response.array;
      console.log(this.category);
    });

    this.http.get<any>('http://localhost:4000/user/AdminEvent',requestOptions).subscribe(Response=>{
      console.log(Response);
      this.event=Response.array;
      console.log(this.event[0].Event_Name)

    })


  }

  addTicket(){
    var token=localStorage.getItem('adminToken');
    console.log(token);

    const headerDict = {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    console.log(this.eventName)
    console.log(this.catName)
    const data={'Event_ID':this.eventName, 'price':this.price, 'TicketsAvailable':this.ticketsAvailable, 'CategoryName':this.catName}
    this.http.post<any>('http://localhost:4000/admin/addTicket',data,requestOptions).subscribe(res=>{
      console.log(res.Status);
      if(res.Status==200){
        this.alertify.success("Tickets added")

        this.route.navigateByUrl('ticketData')
      }else{
        console.log(res.sqlMessage);
        this.alertify.error(res.sqlMessage)

        //this.openDialog()
      }
    })
  }
  cancel(){
    this.alertify.success("Tickets not added")
    this.route.navigateByUrl('ticketData')
  }

}
