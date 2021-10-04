import { AlertifyService } from './../alertify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { GridApi } from 'ag-grid-community';
import { NgPopupsService } from 'ng-popups';

@Component({
  selector: 'app-ticket-data',
  templateUrl: './ticket-data.component.html',
  styleUrls: ['./ticket-data.component.scss']
})
export class TicketDataComponent implements OnInit {

  constructor(private route: Router, private httpClient: HttpClient,private alertify: AlertifyService, private ngPopups: NgPopupsService) { }

  columnDefs = [
    { field: 'Event_ID' },
    { field: 'TicketID' },
    { field: 'price'},
    { field: 'TicketsAvailable'},
    { field: 'CategoryName'}
  ];

  rowData: any[];
  selectedData:any;

  del:any=[];



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


    this.httpClient.get<any>('http://localhost:4000/user/AdminTickets',requestOptions).subscribe(response=>{
      if(response.status==200){
        this.rowData=response.array;
      }else{
        this.alertify.error(response)
      }


    })

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

  onSelectionChanged({api}: {api: GridApi} ): void{
    const selection= api.getSelectedRows();
    if(selection.length===0){
      return;
    }
    this.selectedData=selection[0];
    console.log(this.selectedData)
  }

  delEvent(){
    var token=localStorage.getItem('adminToken');
    console.log(token);

    const headerDict = {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    if(!this.selectedData){
      return ;
    }

    let a:any;
    a=this.selectedData.TicketID;

    this.ngPopups.confirm('Are you sure you want to delele this ticket?')
  .subscribe(res => {
    if (res) {
      this.httpClient.delete(`http://localhost:4000/user/ticketDel/${a}`,requestOptions).subscribe(res=>{
        console.log(res);
        this.del.push(res);
        if(this.del[0]['status']==200){
          this.alertify.success('ticket Deleted')
          window.location.reload();
        }else{
          console.log(this.del[0])
          this.ngPopups.prompt(this.del[0]["sqlMessage"])
        }
      });
    } else {
      this.alertify.warning('Ticket not deleted');
    }
  });







  }

  getRowNodeId(user:any){
    return user.TicketID

  }

  addTicket(){
    this.route.navigateByUrl('addticket')
  }

  categoryShow(){
    this.route.navigateByUrl('ticketCategory')
  }

  logout(){
    localStorage.setItem('adminToken','');

    this.route.navigateByUrl('adminLogin')
  }

  updateTicket(){
    this.route.navigateByUrl('/updateTicket',{state: this.selectedData})

  }




}

