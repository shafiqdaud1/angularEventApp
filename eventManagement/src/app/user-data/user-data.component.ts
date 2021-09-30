import { AlertifyService } from './../alertify.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, } from '@angular/router';
import {  HttpClient,HttpHeaders} from '@angular/common/http';
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
  check:any=[];




  constructor(private route: Router, private router:ActivatedRoute,private httpClient:HttpClient, private alertify: AlertifyService) { }

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


    this.httpClient.get<any>('http://localhost:4000/user/userData',requestOptions).subscribe(res=>{
      if(res.status==200){
        this.rowData=res.array;

      }  else{
        this.alertify.error("no data found")
      }

      console.log(res.status)
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

  delUser(){
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

    let a;
    a=this.selectedData.UserID;

    if(confirm("Are you sure to delete ")){
      this.httpClient.delete(`http://localhost:4000/user/userDel/${a}`,requestOptions).subscribe(res=>{
        this.check.push(res);
        if(this.check[0]['status']==200){
          this.alertify.success("user deleted")
          window.location.reload();
        }else{
          this.alertify.error(this.check[0]['sqlMessage'])
        }

      });
    }




  }

  getRowNodeId(user:any){
    return user.UserID

  }

  categoryShow(){
    this.route.navigateByUrl('ticketCategory')
  }

  logout(){
    this.alertify.success("LoggedOut")
    localStorage.setItem('adminToken','');

    this.route.navigateByUrl('adminLogin')
  }


}
