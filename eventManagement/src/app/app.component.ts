import { Component } from '@angular/core';
import * as $ from 'jquery' ;
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eventManagement';
  showButton:boolean=false;


  constructor(private route: Router ) {
    route.events.forEach((event) => {
      if(event instanceof NavigationStart) {
          this.showButton = event.url !== "adminLogin" && event.url!=="login";
      }
    });
  }
  user( ){
    this.route.navigateByUrl('login')
  }

  admin(){
    this.route.navigateByUrl('adminLogin')

  }


}
