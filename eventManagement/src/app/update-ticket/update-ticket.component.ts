import { AlertifyService } from './../alertify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http'
@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.scss']
})
export class UpdateTicketComponent implements OnInit {
  data:any=[];
  price:any;
  availableTickets:any;
  ticketID:any;
  check:any=[];


  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient,private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.ticketID=history.state.TicketID;
    this.data.push(history.state);
    this.price=history.state.price;
    this.availableTickets=history.state.TicketsAvailable;

    console.log(this.price)
    console.log(this.availableTickets)
  }

  update(){

    var token=localStorage.getItem('adminToken');
    console.log(token);

    const headerDict = {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };



    const data={'price': this.price,'TicketsAvailable':this.availableTickets}
    console.log(this.price)
    this.http.put(`http://localhost:4000/admin/updateTicket/${this.ticketID}`,data,requestOptions).subscribe(res=>{
      this.check.push(res);
      if(this.check[0]['Status']==200){
        this.alertify.success("Ticket Updated")
        this.router.navigateByUrl('ticketData')
      }else{
        console.log(this.check[0])
        this.alertify.error(this.check[0]['sqlMessage'])
      }



    })

  }

  cancel(){

    this.router.navigateByUrl('ticketData')

  }

}
