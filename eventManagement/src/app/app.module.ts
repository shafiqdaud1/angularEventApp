import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { UserDataComponent } from './user-data/user-data.component';
import { AgGridModule } from 'ag-grid-angular';
import { TicketDataComponent } from './ticket-data/ticket-data.component';
import { EventDataComponent } from './event-data/event-data.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { UpdateEventComponent } from './update-event/update-event.component';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EventListComponent,
    EventDetailComponent,
    AdminPanelComponent,
    DashboardComponent,
    UserDataComponent,
    TicketDataComponent,
    EventDataComponent,
    AddEventComponent,
    AddTicketComponent,
    UpdateEventComponent,
    UpdateTicketComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    AgGridModule.withComponents([]),
    DateTimePickerModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
