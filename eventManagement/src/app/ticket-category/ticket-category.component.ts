import { AlertifyService } from './../alertify.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-ticket-category',
  templateUrl: './ticket-category.component.html',
  styleUrls: ['./ticket-category.component.scss']
})
export class TicketCategoryComponent implements OnInit {
  selectedData:any;
  category:any=[];
  rowData:any=[];
  check:any=[];

  columnDefs = [
    { field: 'CategoryName' ,},

  ];

  constructor(private route: Router, private httpClient: HttpClient, private alertify:AlertifyService, ) { }

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


    this.httpClient.get<any>('http://localhost:4000/user/AdminTicketCategory',requestOptions).subscribe(Response=>{
      if(Response.status==200){
        this.rowData=Response.array;

      }else{
        this.alertify.error(Response)
      }

      console.log(this.rowData);
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

  categoryShow(){
    this.route.navigateByUrl('ticketCategory')
  }

  onSelectionChanged({api}: {api: GridApi} ): void{
    const selection= api.getSelectedRows();
    if(selection.length===0){
      return;
    }
    this.selectedData=selection[0];

  }

  delCat(){
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
    a=this.selectedData.CategoryName;


    if(confirm("Are you sure to delete ")){
      this.httpClient.delete(`http://localhost:4000/user/catDel/${a}`,requestOptions).subscribe(Response=>{
        this.check.push(Response);
      if(this.check[0]['status']==200){
        this.alertify.success("Category deleted");
        window.location.reload();

      }else{
        this.alertify.error('Category assigned to ticket. Cannot delete before deleting relevant ticket')
      }

    });


    }




  }

  getRowNodeId(user:any){
    return user.CategoryName


  }

  addCat(){
    this.route.navigateByUrl('addCategory')
  }
  logout(){
    localStorage.setItem('adminToken','');

    this.route.navigateByUrl('adminLogin')
  }






}


