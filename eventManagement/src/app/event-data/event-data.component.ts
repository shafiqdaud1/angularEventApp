import { AlertifyService } from './../alertify.service';
import { NavigationExtras,Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AgGridAngular} from 'ag-grid-angular';
import { GridApi } from 'ag-grid-community';
import { NgPopupsService } from 'ng-popups';





@Component({
  selector: 'app-event-data',
  templateUrl: './event-data.component.html',
  styleUrls: ['./event-data.component.scss']
})
export class EventDataComponent implements OnInit {
  selectedData:any;



  constructor(private route: Router, private httpClient: HttpClient, private alertify: AlertifyService,private ngPopups: NgPopupsService) { }

  columnDefs = [
    { field: 'Event_ID' ,},
    { field: 'Event_Name', },
    { field: 'Location'},
    { field: 'Description'},
    { field: 'DateTime'}
  ];

  rowData: any=[];



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



    this.httpClient.get<any>('http://localhost:4000/user/AdminEvent ',requestOptions).subscribe(response=>{
      if(response.status==200){
        //this.alertify.success("data found");
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
    let check:any=[];
    a=this.selectedData.Event_ID;

    this.ngPopups.confirm('Are you sure you want to delete this event?')
  .subscribe(res => {
    if (res) {
      this.httpClient.delete(`http://localhost:4000/user/eventDel/${a}`,requestOptions).subscribe(
        response=>{

          check.push(response)
          console.log(check[0])
          if(check[0]['status']==200){

            window.location.reload();
            this.alertify.success('Event deleted');
          }else{
            this.alertify.error('Cannot delete event. First delete its relevant ticket')
          }

        }
      );
    } else {
      this.alertify.warning('Event not deleted')
    }
  });






  }




  getRowNodeId(user:any){
    return user.Event_ID

  }

  updateEvent(){

    this.route.navigateByUrl('/updateEvent', {state: this.selectedData} );

  }

  categoryShow(){
    this.route.navigateByUrl('ticketCategory')
  }

  logout(){
    localStorage.setItem('adminToken','');

    this.route.navigateByUrl('adminLogin')
  }





}


