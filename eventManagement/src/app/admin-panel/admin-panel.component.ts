import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  adminForm: FormGroup;


  constructor(private httpClient:HttpClient,private router:Router,private router1:ActivatedRoute) { }

  ngOnInit(): void {

    this.adminForm=new FormGroup(
      {
        adminEmail: new FormControl(),
        adminPassword: new FormControl()
      }
    )
  }

  adminLogin(){

    const body ={'adminEmail':this.adminForm.get("adminEmail")?.value, 'adminPass':this.adminForm.get("adminPassword")?.value};

    this.httpClient.post<any>('http://localhost:4000/user/admin',body).subscribe(
      (Response1)=>{
        if(Response1.status==200){
          localStorage.setItem('adminToken',Response1.token);
          this.router.navigateByUrl("/dashboard");

        }else if(Response1.stauts==403){
          console.log('error');
        }

      }
    )


  }

}
