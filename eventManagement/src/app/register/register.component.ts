import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email:any;
  FName:any;
  LName:any;
  password:any;
  number:any;

  constructor(private router: Router,
    private httpClient:HttpClient) { }

  ngOnInit(): void {


  }

  SignUp(){





      const headers= {'content-type':'application/json'};

      const data={'EmailAddress': this.email, 'FName':this.FName, 'LName': this.LName, 'password':this.password,'phoneNumber':this.number}

      this.httpClient.post<any>('http://localhost:4000/user',data,{headers}).subscribe(user => {
        console.log(user.status)
      })

    this.router.navigateByUrl('/login');

  }





}
