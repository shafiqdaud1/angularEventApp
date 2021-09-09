import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  form={
    email:'email',
    password:'password',
    firstName:'firstName',
    lastName:'lastName',
    phoneNumber:'phoneNumber'
  }


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  SignUp(){

    this.router.navigateByUrl('/login');


  }

}
