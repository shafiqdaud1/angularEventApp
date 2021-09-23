import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, } from '@angular/router';
import {  HttpClient} from '@angular/common/http';
import { GridApi } from 'ag-grid-community';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {


  columnDefs = [
    { field: 'UserID' },
    { field: 'FName' },
    { field: 'LName'},
    { field: 'EmailAddress'},
    { field: 'password'},
    { field: 'phoneNumber'}
  ];

  rowData: any[];
  selectedData:any;




  constructor(private route: Router, private router:ActivatedRoute,private httpClient:HttpClient) { }

  ngOnInit(): void {

    this.httpClient.get<any>('http://localhost:4000/user/userData').subscribe(res=>{
      this.rowData=res;
    });


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
    a=this.selectedData.UserID;

    this.httpClient.delete(`http://localhost:4000/user/userDel/${a}`).subscribe();
    window.location.reload();

  }

  getRowNodeId(user:any){
    return user.UserID

  }


}
