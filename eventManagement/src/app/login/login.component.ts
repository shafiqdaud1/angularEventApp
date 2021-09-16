import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { getLocaleWeekEndRange } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  check:any;

  constructor(private router:Router,
    private httpClient: HttpClient
    ) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup(
      {
        email: new FormControl(),
        password: new FormControl()
      }
    )

  }

  login(){
    const headers= {'content-type':'application/json'};
     const body={'EmailAddress': this.loginForm.get("email")?.value, 'password': this.loginForm.get("password")?.value }

    this.httpClient.post<any>('http://localhost:4000/user/login',body, {headers}).subscribe(
       (response1 :any)=>{

         if(response1.status==200){

           localStorage.setItem('data',response1.token);
          var token=localStorage.getItem('data');
          console.log(token);


              this.router.navigateByUrl('/eventList');
         }else{
           console.log("no")
         }

      }
    )

  }


  setSession(){

  }

}
