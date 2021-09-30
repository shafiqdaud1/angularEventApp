import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AlertifyService } from '../alertify.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categoryName: any;

  constructor(private route: Router, private http: HttpClient, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  addCategory(){
   const data={'CategoryName':this.categoryName}

   var token=localStorage.getItem('adminToken');
   console.log(token);

   const headerDict = {
     'Content-Type': 'application/json',
     'authorization': `Bearer ${token}`
   }

   const requestOptions = {
     headers: new HttpHeaders(headerDict),
   };


    this.http.post('http://localhost:4000/user/addCat',data,requestOptions).subscribe(
      response1=>{
        console.log(response1);
        this.route.navigateByUrl('ticketCategory')
      }
    )
  }

  cancel(){

    this.route.navigateByUrl('ticketCategory')
  }

}
