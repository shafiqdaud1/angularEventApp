import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-ticket-data',
  templateUrl: './ticket-data.component.html',
  styleUrls: ['./ticket-data.component.scss']
})
export class TicketDataComponent implements OnInit {

  constructor(private route: Router, private httpClient: HttpClient) { }

  columnDefs = [
    { field: 'Event_ID' },
    { field: 'TicketID' },
    { field: 'price'},
    { field: 'TicketsAvailable'},
    { field: 'CategoryName'}
  ];

  rowData: any[];
  selectedData:any;



  ngOnInit(): void {

    this.httpClient.get<any>('http://localhost:4000/user/AdminTickets').subscribe(response=>{
      this.rowData=response;


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
    if(!this.selectedData){
      return ;
    }

    let a;
    a=this.selectedData.TicketID;

    this.httpClient.delete(`http://localhost:4000/user/ticketDel/${a}`).subscribe(res=>{
      console.log(res);
    });
    window.location.reload();

  }

  getRowNodeId(user:any){
    return user.TicketID

  }



}

