import { NavigationExtras,Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AgGridAngular} from 'ag-grid-angular';
import { GridApi } from 'ag-grid-community';


@Component({
  selector: 'app-event-data',
  templateUrl: './event-data.component.html',
  styleUrls: ['./event-data.component.scss']
})
export class EventDataComponent implements OnInit {
  selectedData:any;



  constructor(private route: Router, private httpClient: HttpClient) { }

  columnDefs = [
    { field: 'Event_ID' ,},
    { field: 'Event_Name', },
    { field: 'Location'},
    { field: 'Description'},
    { field: 'DateTime'}
  ];

  rowData: any=[];



  ngOnInit(): void {



    this.httpClient.get<any>('http://localhost:4000/user/AdminEvent').subscribe(response=>{

      console.log(response);
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

  addEvent(){
    this.route.navigateByUrl('addevent')
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
    a=this.selectedData.Event_ID;

    this.httpClient.delete(`http://localhost:4000/user/eventDel/${a}`).subscribe();
    window.location.reload();

  }

  getRowNodeId(user:any){
    return user.Event_ID

  }

  updateEvent(){


    this.route.navigateByUrl('/updateEvent', {state: this.selectedData} );

  }


}


