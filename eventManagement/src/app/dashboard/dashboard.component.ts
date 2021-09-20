import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chart:any = [];
  data:any;

  constructor( private observer: BreakpointObserver) { }

  ngOnInit(): void {



    this. data=[
      {
        label: ['a','b','c'],
        data: [1,2,3]
      }
    ];
    this.chart=new Chart('canvas',{
      type: 'bar',
      data: {
        datasets: [
          {
            data:[15,5],
            label:'Stats',
            backgroundColor: '#007bff',

          }
        ],
        labels: ['Events','Users'],
      },
      options: {
        responsive: true,
        scales: {


        }
        }
      }

    )


  }


}
