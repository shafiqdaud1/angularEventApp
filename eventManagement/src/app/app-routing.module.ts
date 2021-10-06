import { CartComponent } from './cart/cart.component';

import { TicketCategoryComponent } from './ticket-category/ticket-category.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventListComponent } from './event-list/event-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDataComponent } from './user-data/user-data.component';
import { EventDataComponent } from './event-data/event-data.component';
import { TicketDataComponent } from './ticket-data/ticket-data.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { HomeComponent } from './home/home.component'



const routes: Routes = [
  {path:'', redirectTo: 'HomeComponent',pathMatch: 'full' },
  {path: 'login',component:LoginComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'eventList',component:EventListComponent},
  {path: 'eventDetail/:id',component: EventDetailComponent},
  {path: 'adminLogin',component: AdminPanelComponent},
  {path: 'dashboard', component: DashboardComponent,},
  {path: 'userData',component: UserDataComponent},
  {path: 'ticketData',component: TicketDataComponent},
  {path: 'eventData',component: EventDataComponent},
  {path:'addevent',component:AddEventComponent},
  {path: 'addticket',component:AddTicketComponent},
  {path: 'updateEvent',component:UpdateEventComponent},
  {path: 'updateTicket',component:UpdateTicketComponent},
  {path: 'ticketCategory', component: TicketCategoryComponent},
  {path: 'addTicketCategory', component: AddTicketComponent},
  {path: 'addCategory',component:AddCategoryComponent},
  {path: 'cart',component:CartComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
