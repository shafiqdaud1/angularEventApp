import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  form={
    email:"email",
    password:"password"
  }

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  login(){

    this.router.navigateByUrl('/eventList');
  }

}
