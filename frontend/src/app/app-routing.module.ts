import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClaimsComponent } from './pages/claims/claims.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { UsersComponent } from './pages/users/users.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { FinancialDashboardComponent } from './pages/financial-dashboard/financial-dashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'clients',
    component: ClientsComponent,
  },
  {
    path: 'claims',
    component: ClaimsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'messages',
    component: MessagesComponent,
  },
  {
    path: 'financial-dashboard',
    component: FinancialDashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
